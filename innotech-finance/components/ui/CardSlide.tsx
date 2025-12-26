import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
  ViewToken,
} from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/constants/colors';
import type { ImageSourcePropType } from 'react-native';

const CARD_WIDTH = 360;

export interface SlideItem {
  id: string | number;
  image: ImageSourcePropType; // Image source (require() or URL)
  title?: string;
  subtitle?: string;
  onPress?: () => void;
}

interface CardSlideProps {
  slides: SlideItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showPagination?: boolean;
  height?: number;
  onSlideChange?: (index: number) => void;
}

export const CardSlide: React.FC<CardSlideProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showPagination = true,
  height = 163,
  onSlideChange,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollPosition / CARD_WIDTH);
      if (index !== activeIndex && index >= 0 && index < slides.length) {
        setActiveIndex(index);
        onSlideChange?.(index);
      }
    },
    [activeIndex, slides.length, onSlideChange]
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        const index = viewableItems[0].index;
        if (index !== activeIndex) {
          setActiveIndex(index);
          onSlideChange?.(index);
        }
      }
    },
    [activeIndex, onSlideChange]
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  React.useEffect(() => {
    if (!autoPlay || slides.length <= 1) {
      return undefined;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % slides.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, slides.length]);

  const renderSlide = useCallback(
    ({ item }: { item: SlideItem }) => (
      <View style={[styles.slideContainer, { width: CARD_WIDTH, height }]}>
        <Image
          source={item.image}
          style={styles.slideImage}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
        />
      </View>
    ),
    [height]
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: CARD_WIDTH,
      offset: CARD_WIDTH * index,
      index,
    }),
    []
  );

  if (slides.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
      />
      {showPagination && slides.length > 1 && (
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.paginationDot, index === activeIndex && styles.paginationDotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 17,
  },
  listContent: {
    paddingHorizontal: 0,
  },
  slideContainer: {
    backgroundColor: colors.greyVariant_2,
    borderRadius: 16,
    gap: 2,
    overflow: 'hidden',
    width: CARD_WIDTH,
  },
  slideImage: {
    borderRadius: 16,
    height: '100%',
    width: '100%',
  },
  slideOverlay: {
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },

  pagination: {
    alignItems: 'center',
    gap: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  paginationDot: {
    borderRadius: 3,
    backgroundColor: colors.greyVariant_4,
    height: 6,
    opacity: 0.4,
    width: 6,
  },
  paginationDotActive: {
    backgroundColor: colors.accent,
    opacity: 1,
    width: 20,
  },
});

export default CardSlide;
