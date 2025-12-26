import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { Button } from '@/components/ui';
import { walletData } from '@/constants/data';

import back from '@/assets/icons/back icon.png';
import rightArrow from '@/assets/icons/forward icon.png';
import swapIcon from '@/assets/icons/swap.png';

const Conversion = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState<'CAD' | 'NGN'>('CAD');
  const exchangeRate = 1230.0;

  const cadWallet = walletData.find(w => w.currency === 'CAD');
  const ngnWallet = walletData.find(w => w.currency === 'NGN');

  const handleSwap = () => {
    setFromCurrency(prev => (prev === 'CAD' ? 'NGN' : 'CAD'));
    setAmount('');
  };

  const calculateConvertedAmount = () => {
    if (!amount || parseFloat(amount.replace(/[^0-9.]/g, '')) === 0) {
      return '0.00';
    }
    const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (fromCurrency === 'CAD') {
      return (numericAmount * exchangeRate).toFixed(2);
    } else {
      return (numericAmount / exchangeRate).toFixed(2);
    }
  };

  const formatAmount = (value: string) => {
    if (!value) return '';
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    if (!numericValue) return '';

    // Handle multiple decimal points - keep only the first one
    const parts = numericValue.split('.');
    const integerPart = parts[0] || '';
    const decimalPart = parts.length > 1 ? '.' + parts.slice(1).join('').substring(0, 2) : '';

    // Format integer part with commas
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedInteger + decimalPart;
  };

  const convertedAmount = calculateConvertedAmount();
  const displayAmount = amount ? formatAmount(amount) : '';
  const fromSymbol = fromCurrency === 'CAD' ? '$' : '₦';
  const toSymbol = fromCurrency === 'CAD' ? '₦' : '$';
  const toCurrency = fromCurrency === 'CAD' ? 'NGN' : 'CAD';

  const handleAmountChange = (text: string) => {
    // Allow digits and single decimal point
    let numericValue = text.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const decimalIndex = numericValue.indexOf('.');
    if (decimalIndex !== -1) {
      const beforeDecimal = numericValue.substring(0, decimalIndex);
      const afterDecimal = numericValue.substring(decimalIndex + 1).replace(/\./g, '');
      numericValue = beforeDecimal + '.' + afterDecimal;
    }

    // Limit decimal places to 2
    if (numericValue.includes('.')) {
      const parts = numericValue.split('.');
      if (parts[1] && parts[1].length > 2) {
        numericValue = parts[0] + '.' + parts[1].substring(0, 2);
      }
    }

    setAmount(numericValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Image source={back} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Convert Funds</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.walletSection}>
          <View>
            <Text style={styles.walletTitle}>
              {fromCurrency === 'CAD' ? 'CAD Wallet' : 'NGN Wallet'}
            </Text>
            <Text style={styles.walletBalance}>
              {fromCurrency === 'CAD' ? cadWallet?.amount || '$0.00' : ngnWallet?.amount || '₦0.00'}
            </Text>
          </View>

          <TouchableOpacity onPress={handleSwap} style={styles.swapButton}>
            <Image source={rightArrow} style={styles.swapIcon} />
          </TouchableOpacity>

          <View>
            <Text style={styles.walletTitle}>
              {toCurrency === 'CAD' ? 'CAD Wallet' : 'NGN Wallet'}
            </Text>
            <Text style={styles.walletBalance}>
              {toCurrency === 'CAD' ? cadWallet?.amount || '$0.00' : ngnWallet?.amount || '₦0.00'}
            </Text>
          </View>
        </View>

        <View style={styles.amountSection}>
          <View style={styles.amountInputRow}>
            <View>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbolContainer}>
                  <Text style={styles.currencySymbol}>{fromSymbol}</Text>
                </Text>
                {!amount && <View style={styles.cursor} />}
                <TextInput
                  style={styles.amountInput}
                  value={displayAmount}
                  onChangeText={handleAmountChange}
                  placeholder="0.00"
                  placeholderTextColor={colors.greyVariant_4}
                  keyboardType="decimal-pad"
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="done"
                  selectTextOnFocus={false}
                />
              </View>
              <View style={styles.convertedAmountContainer}>
                <Text style={styles.convertedAmountLabel}>
                  {toSymbol}
                  {convertedAmount}
                </Text>
              </View>
            </View>

            <View style={styles.swapCurrencyContainer}>
              <TouchableOpacity onPress={handleSwap} style={styles.swapCurrencyButton}>
                <Image source={swapIcon} />
              </TouchableOpacity>
              <Text style={styles.swapCurrencyLabel}>{toCurrency}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <View style={styles.infoBar}>
          <Text style={styles.exchangeRate}>
            ~ 1 {fromCurrency} ={' '}
            {exchangeRate.toLocaleString('en-US', { minimumFractionDigits: 2 })} {toCurrency}
          </Text>
          <Text style={styles.feeText}>
            Fee: {fromSymbol}0.00 <Text style={styles.freeText}>(Free)</Text>
          </Text>
        </View>

        <Button
          title={`Send ${fromSymbol}${displayAmount || '0.00'}`}
          onPress={() => {
            console.log('Convert:', amount, fromCurrency, 'to', toCurrency);
          }}
          variant="primary"
          disabled={!amount || parseFloat(amount) === 0}
          style={styles.sendButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default Conversion;

const styles = StyleSheet.create({
  amountInput: {
    fontSize: 60,
    fontWeight: '400',
    color: colors.accent,
    height: 81,
    padding: 0,
    margin: 0,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    justifyContent: 'center',
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 16,
  },
  amountSection: {
    alignItems: 'center',
    marginHorizontal: 27,
    width: '100%',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.greyVariant_1,
    marginTop: 2,
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.greyVariant_1,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: colors.greyVariant_12,
    borderRadius: 19,
    justifyContent: 'center',
    height: 38,
    width: 38,
  },
  bottomSection: {
    paddingBottom: 20,
    backgroundColor: colors.primary,
  },
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    paddingHorizontal: 27,
  },
  convertedAmountContainer: {
    marginTop: 11,
  },
  convertedAmountLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.greyVariant_4,
    textAlign: 'center',
  },
  currencySymbolContainer: {
    height: 36,
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.greyVariant_4,
    lineHeight: 20,
    paddingBottom: 8,
  },
  cursor: {
    width: 2,
    height: 40,
    backgroundColor: colors.accentVariant_1,
    marginHorizontal: -2,
  },
  exchangeRate: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.accent,
  },
  feeText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.accent,
  },
  freeText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.greyVariant_1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 30,
  },
  headerSpacer: {
    width: 43,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.greyVariant_11,
    borderRadius: 21,
    paddingHorizontal: 16,
    height: 42,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  sendButton: {
    marginTop: 16,
  },
  swapArrows: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    height: 43,
    width: 43,
  },
  swapCurrencyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: colors.greyVariant_3,
  },
  swapCurrencyContainer: {
    alignItems: 'center',
    marginLeft: 16,
  },
  swapCurrencyLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.greyVariant_13,
  },
  swapIcon: {
    tintColor: colors.black,
  },
  walletBalance: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.greyVariant_1,
    marginTop: 4,
  },
  walletSection: {
    alignItems: 'center',
    backgroundColor: colors.greyVariant_5,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 114,
    padding: 18,
  },
  walletTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.black,
  },
});
