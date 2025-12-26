import React, { ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
  ImageSourcePropType,
  TextStyle,
} from 'react-native';
import { colors } from '@/constants/colors';

import closeIcon from '../../assets/icons/cancel.png';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  titleIcon?: ImageSourcePropType;
  titleStyle?: TextStyle;
  children: ReactNode;
  footer?: ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  titleIcon,
  titleStyle,
  children,
  footer,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouchable} activeOpacity={1} onPress={onClose} />
        <View style={styles.bottomSheet}>
          <View style={styles.handleContainer}>
            {title && (
              <View style={styles.titleContainer}>
                {titleIcon && <Image source={titleIcon} style={styles.titleIcon} />}
                <Text style={[styles.title, titleStyle]}>{title}</Text>
              </View>
            )}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image source={closeIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            bounces={false}
          >
            <View style={styles.childrenWrapper}>{children}</View>
          </ScrollView>
          {footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingBottom: 30,
    paddingHorizontal: 27,
    paddingTop: 28,
  },
  childrenWrapper: {
    width: '100%',
    overflow: 'visible',
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.accentVariant_2,
    borderRadius: 100,
    height: 35,
    justifyContent: 'center',
    width: 35,
  },
  content: {
    width: '100%',
    overflow: 'visible',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 10,
    overflow: 'visible',
  },
  footer: {
    paddingTop: 20,
    marginTop: 47,
  },
  handleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 27,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
  },
  title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '500',
    paddingHorizontal: 0,
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  titleIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
