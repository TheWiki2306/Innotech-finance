import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { colors } from '@/constants/colors';
import { useUserProfile } from '@/hooks/use-user-profile';
import Wallet from '@/components/wallet';
import { CardSlide } from '@/components/ui';
import TransactionSection from '@/components/transactionSection';

import helpIcon from '@/assets/icons/help.png';
import notificationIcon from '@/assets/icons/notif.png';

const slides = [
  {
    id: 1,
    image: require('@/assets/images/image_1.png'),
  },
  {
    id: 2,
    image: require('@/assets/images/image_2.png'),
  },
  {
    id: 3,
    image: require('@/assets/images/image_2.png'),
  },
  {
    id: 4,
    image: require('@/assets/images/image_2.png'),
  },
];
const Home = () => {
  const user = useUserProfile();
  const userFullName = user.profile?.firstName + ' ' + user.profile?.lastName;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled={true}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerText}>Good Afternoon,</Text>
              <Text style={styles.userName}>{userFullName}</Text>
            </View>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.headerButton}>
                <Text style={styles.headerButtonText}>Help</Text>
                <Image source={helpIcon} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image source={notificationIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <CardSlide slides={slides} />
          <Wallet />
          <TransactionSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 27,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 10,
    fontWeight: '400',
    color: colors.greyVariant_6,
    height: 13,
  },
  headerButton: {
    alignItems: 'center',
    backgroundColor: colors.other,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.accentVariant_1,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    height: 18,
    width: 59,
  },
  headerButtons: {
    alignItems: 'center',

    flexDirection: 'row',
    gap: 10,
  },
  headerButtonText: {
    color: colors.black,
    fontSize: 10,
    fontWeight: '400',
  },
  userName: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '400',
    height: 20,
  },
});
