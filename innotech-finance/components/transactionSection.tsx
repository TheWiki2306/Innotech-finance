import { StyleSheet, Text, TouchableOpacity, Image, View, ImageSourcePropType } from 'react-native';
import React, { useState } from 'react';
import { colors } from '@/constants/colors';
import { BottomSheet, Button } from '@/components/ui';

import cadIcon from '@/assets/icons/cad.png';
import ngnIcon from '@/assets/icons/ngn.png';
import addIcon from '@/assets/icons/add.png';
import transferIcon from '@/assets/icons/send_1.png';
import convertIcon from '@/assets/icons/convert.png';
import emptyCircleIcon from '@/assets/icons/emptyCircle.png';
import checkedCircleIcon from '@/assets/icons/check.png';
import { router } from 'expo-router';

interface SelectOption {
  id: string;
  title: string;
  logo: string;
}

const walletOptions: SelectOption[] = [
  {
    id: '1',
    title: 'CAD Wallet',
    logo: cadIcon,
  },
  {
    id: '2',
    title: 'NGN Wallet',
    logo: ngnIcon,
  },
];
const TransactionSection = () => {
  const [showDespositBottomSheet, setShowDespositBottomSheet] = useState(false);
  const [showTransferBottomSheet, setShowTransferBottomSheet] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const handleContinue = () => {
    // Handle continue action
    console.log('Selected wallet:', selectedWallet);
    setShowDespositBottomSheet(false);
    setShowTransferBottomSheet(false);
    setSelectedWallet(null);
  };

  const renderBottomSheetOption = (option: SelectOption) => {
    const isSelected = selectedWallet === option.id;
    return (
      <TouchableOpacity
        key={option.id}
        onPress={() => setSelectedWallet(option.id)}
        activeOpacity={0.7}
      >
        <View style={styles.bottomSheetOptionContent}>
          <View style={styles.bottomSheetOptionTextContainer}>
            <Image
              source={option.logo as ImageSourcePropType}
              style={styles.bottomSheetOptionLogo}
            />
            <Text style={styles.bottomSheetOptionText}>{option.title}</Text>
          </View>
          <Image source={isSelected ? checkedCircleIcon : emptyCircleIcon} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowDespositBottomSheet(true)}
        >
          <Image source={addIcon} />
          <Text style={styles.actionButtonText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowTransferBottomSheet(true)}
        >
          <Image source={transferIcon} />
          <Text style={styles.actionButtonText}>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('(screens)/conversion')}
        >
          <Image source={convertIcon} />
          <Text style={styles.actionButtonText}>Convert</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet
        visible={showDespositBottomSheet}
        onClose={() => {
          setShowDespositBottomSheet(false);
          setSelectedWallet(null);
        }}
        title="Select wallet to fund"
        footer={
          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            disabled={!selectedWallet}
          />
        }
      >
        {walletOptions.map(option => renderBottomSheetOption(option))}
      </BottomSheet>
      <BottomSheet
        visible={showTransferBottomSheet}
        onClose={() => {
          setShowTransferBottomSheet(false);
          setSelectedWallet(null);
        }}
        title="Send Funds From"
        footer={
          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            disabled={!selectedWallet}
          />
        }
      >
        {walletOptions.map(option => renderBottomSheetOption(option))}
      </BottomSheet>
    </View>
  );
};

export default TransactionSection;

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.other,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    height: 42,
    width: 100,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.accentVariant_1,
  },
  bottomSheetOptionContent: {
    alignItems: 'center',
    borderBottomColor: colors.greyVariant_3,
    borderBottomWidth: 1,
    borderTopColor: colors.greyVariant_3,
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 71,
    justifyContent: 'space-between',
  },
  bottomSheetOptionLogo: {
    height: 33.75,
    width: 28.58,
    resizeMode: 'contain',
  },
  bottomSheetOptionText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.black,
  },
  bottomSheetOptionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
});
