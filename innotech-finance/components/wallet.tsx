import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Card, BottomSheet } from '@/components/ui';
import { colors } from '@/constants/colors';
import { walletData, transactionData } from '@/constants/data';

import arrowRightIcon from '@/assets/icons/right arrow.png';
import eyeIcon from '@/assets/icons/eye icon.png';
import minusIcon from '@/assets/icons/minus bar.png';
import addIcon from '@/assets/icons/add.png';
import cadIcon from '@/assets/icons/cad.png';
import ngnIcon from '@/assets/icons/ngn.png';
import searchIcon from '@/assets/icons/search.png';

const Wallet = () => {
  const [showCadWalletBottomSheet, setShowCadWalletBottomSheet] = useState(false);
  const [showNgnWalletBottomSheet, setShowNgnWalletBottomSheet] = useState(false);
  const [balanceVisibility, setBalanceVisibility] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    walletData.forEach(item => {
      initial[item.id] = true;
    });
    return initial;
  });
  const [bottomSheetBalanceVisible, setBottomSheetBalanceVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleBalanceVisibility = (walletId: number) => {
    setBalanceVisibility(prev => ({
      ...prev,
      [walletId]: !prev[walletId],
    }));
  };

  const maskAmount = (amount: string) => {
    const currencyMatch = amount.match(/^([$₦€£¥]?)/);
    const currency = currencyMatch ? currencyMatch[1] : '';
    const visibleChars = amount.replace(/[^0-9.,]/g, '').length;
    const masked = '•'.repeat(Math.max(visibleChars, 6));
    return `${currency}${masked}`;
  };

  const filteredTransactions = transactionData.filter(transaction =>
    transaction.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderWalletBottomSheet = (wallet: (typeof walletData)[0]) => {
    const isVisible = bottomSheetBalanceVisible;
    const displayAmount = isVisible ? wallet.amount : maskAmount(wallet.amount);

    return (
      <View style={styles.bottomSheetContent}>
        <View style={[styles.lineSeparatorWrapper, { marginTop: 0 }]}>
          <View style={styles.lineSeparator} />
        </View>
        <View style={styles.balanceSection}>
          <View>
            <Text style={styles.balanceAmount}>{displayAmount}</Text>
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
          </View>
          <TouchableOpacity
            onPress={() => setBottomSheetBalanceVisible(!bottomSheetBalanceVisible)}
            style={styles.hideBalanceButton}
          >
            <Text style={styles.hideBalanceText}>
              {isVisible ? 'Hide Balance' : 'Show Balance'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lineSeparatorWrapper}>
          <View style={styles.lineSeparator} />
        </View>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.sendButton}>
            <Image source={minusIcon} style={{ tintColor: colors.accentVariant_1 }} />
            <Text style={styles.sendButtonText}>Send Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fundButton}>
            <Image source={addIcon} style={{ tintColor: colors.primary }} />
            <Text style={styles.fundButtonText}>Fund Wallet</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lineSeparatorWrapper}>
          <View style={styles.lineSeparator} />
        </View>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent transactions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>
              View all <Text style={styles.viewAllTextArrow}>{'>'}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Image source={searchIcon} />

          <TextInput
            style={styles.searchInput}
            placeholder="Search Transaction"
            placeholderTextColor={colors.greyVariant_4}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredTransactions}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item: transaction }) => {
            const isNegative = transaction.amount.startsWith('-');
            return (
              <View style={styles.transactionItem}>
                <View
                  style={[
                    styles.transactionIconContainer,
                    isNegative ? styles.transactionIconNegative : styles.transactionIconPositive,
                  ]}
                >
                  <Image
                    source={transaction.icon}
                    style={{ tintColor: isNegative ? colors.error : colors.accentVariant_1 }}
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text style={styles.transactionAmount}>{transaction.amount}</Text>
              </View>
            );
          }}
          contentContainerStyle={styles.transactionsList}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {walletData.map(item => {
        const isVisible = balanceVisibility[item.id] ?? true;
        return (
          <Card key={item.id} elevated={true}>
            <View style={styles.cardContent}>
              <View style={styles.cardContentHeader}>
                <Image source={item.icon} />
                <Text style={styles.cardContentHeaderTitle}>{item.title}</Text>
              </View>

              <View style={styles.cardContentAmountContainer}>
                <Text style={styles.cardContentAmount}>
                  {isVisible ? item.amount : maskAmount(item.amount)}
                </Text>
                <TouchableOpacity
                  onPress={() => toggleBalanceVisibility(item.id)}
                  activeOpacity={0.7}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Image
                    source={eyeIcon}
                    style={[styles.eyeIcon, !isVisible && styles.eyeIconHidden]}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.cardContentConversion}>{item.conversion}</Text>

              <View style={styles.seperator} />
              <TouchableOpacity
                style={styles.cardContentDetails}
                onPress={() => {
                  if (item.id === 1) {
                    setShowCadWalletBottomSheet(true);
                  } else if (item.id === 2) {
                    setShowNgnWalletBottomSheet(true);
                  }
                }}
              >
                <Text style={styles.cardContentDetailsTitle}>View Details</Text>
                <Image source={arrowRightIcon} />
              </TouchableOpacity>
            </View>
          </Card>
        );
      })}
      <BottomSheet
        visible={showCadWalletBottomSheet}
        onClose={() => {
          setShowCadWalletBottomSheet(false);
          setBottomSheetBalanceVisible(true);
          setSearchQuery('');
        }}
        title="CAD WALLET"
        titleIcon={cadIcon}
        titleStyle={styles.bottomSheetTitle}
      >
        {renderWalletBottomSheet(walletData[0])}
      </BottomSheet>
      <BottomSheet
        visible={showNgnWalletBottomSheet}
        onClose={() => {
          setShowNgnWalletBottomSheet(false);
          setBottomSheetBalanceVisible(true);
          setSearchQuery('');
        }}
        title="NGN WALLET"
        titleIcon={ngnIcon}
        titleStyle={styles.bottomSheetTitle}
      >
        {renderWalletBottomSheet(walletData[1])}
      </BottomSheet>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  bottomSheetTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.greyVariant_1,
  },
  cardContentAmount: {
    color: colors.accent,
    fontSize: 30,
    fontWeight: '400',
    height: 41,
  },
  cardContentAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardContentConversion: {
    color: colors.greyVariant_1,
    fontSize: 10,
    fontWeight: '400',
    height: 14,
  },
  cardContentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardContentDetailsTitle: {
    color: colors.greyVariant_1,
    fontSize: 12,
    fontWeight: '400',
  },
  cardContentHeader: {
    alignItems: 'center',
    backgroundColor: colors.greyVariant_2,
    borderRadius: 15,
    borderColor: colors.greyVariant_7,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    height: 30,
    justifyContent: 'center',
    marginBottom: 16,
    width: '45%',
  },
  cardContentHeaderTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.greyVariant_1,
  },
  container: {
    marginTop: 20,
    gap: 16,
    overflow: 'visible',
  },
  cardContent: {
    alignItems: 'center',
    height: 186,
    justifyContent: 'center',
  },
  eyeIcon: {
    opacity: 1,
  },
  eyeIconHidden: {
    opacity: 0.5,
  },
  lineSeparatorWrapper: {
    position: 'relative',
    width: '100%',
    height: 1,
    marginVertical: 22,
    overflow: 'visible',
  },
  lineSeparator: {
    backgroundColor: colors.greyVariant_3,
    height: 1,
    position: 'absolute',
    left: -27,
    right: -27,
    width: Dimensions.get('window').width,
  },
  seperator: {
    backgroundColor: colors.greyVariant_3,
    height: 1,
    marginBottom: 13,
    marginTop: 7,
    width: '70%',
  },
  bottomSheetContent: {
    width: '100%',
    overflow: 'visible',
  },
  balanceSection: {
    // marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.black,
    height: 27,
    marginBottom: 3,
  },
  // balanceLabelContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  balanceLabel: {
    fontSize: 15,
    color: colors.greyVariant_1,
    fontWeight: '400',
    height: 20,
  },
  hideBalanceButton: {
    alignItems: 'center',
    backgroundColor: colors.greyVariant_8,
    borderColor: colors.greyVariant_9,
    borderRadius: 12,
    borderWidth: 1,
    height: 20,
    justifyContent: 'center',
    minWidth: 90,
  },
  hideBalanceText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '400',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    // marginBottom: 30,
  },
  sendButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.other,
    borderRadius: 50,
    backgroundColor: colors.primary,
    height: 46,
  },
  fundButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 50,
    backgroundColor: colors.accentVariant_1,
    height: 46,
  },
  sendButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.accentVariant_1,
  },
  fundButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.primary,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  transactionsTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.black,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.accentVariant_1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greyVariant_11,
    borderRadius: 7,
    paddingHorizontal: 12,
    height: 54,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    color: colors.greyVariant_1,
    marginLeft: 8,
  },
  transactionsList: {
    gap: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  transactionIconContainer: {
    width: 23,
    height: 23,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionIconPositive: {
    backgroundColor: colors.other,
  },
  transactionIconNegative: {
    backgroundColor: colors.negative,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.greyVariant_1,
  },
  transactionAmount: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '400',
  },

  viewAllTextArrow: {
    color: colors.greyVariant_10,
  },
});
