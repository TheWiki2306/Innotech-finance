import { ImageSourcePropType } from 'react-native';

import cadIcon from '@/assets/icons/cad.png';
import ngnIcon from '@/assets/icons/ngn.png';
import addIcon from '@/assets/icons/add.png';
import minusIcon from '@/assets/icons/minus bar.png';

type WalletData = {
  id: number;
  title: string;
  amount: string;
  currency: string;
  conversion: string;
  icon: ImageSourcePropType;
};

type TransactionData = {
  id: number;
  title: string;
  amount: string;
  date: string;
  icon: ImageSourcePropType;
};

export const walletData: WalletData[] = [
  {
    id: 1,
    title: 'CAD Balance',
    amount: '$1,729.73',
    currency: 'CAD',
    conversion: '1260 NGN ~ 1 CAD',
    icon: cadIcon,
  },
  {
    id: 2,
    title: 'NGN Balance',
    amount: '₦350,000',
    currency: 'NGN',
    conversion: '1 CAD ~ 1260 NGN',
    icon: ngnIcon,
  },
];

export const transactionData: TransactionData[] = [
  {
    id: 1,
    title: 'Transfer from CAD Wallet to an External CAD Account',
    amount: '- $100',
    date: 'Oct 08, 2024',
    icon: minusIcon,
  },
  {
    id: 2,
    title: 'CAD Funding from direct deposit',
    amount: '+ $100',
    date: 'Oct 04, 2024',
    icon: addIcon,
  },
  {
    id: 3,
    title: 'Transfer from CAD Wallet to an External CAD Account',
    amount: '- $100',
    date: 'Oct 08, 2024',
    icon: minusIcon,
  },
  {
    id: 4,
    title: 'CAD Funding from direct deposit',
    amount: '+ $100',
    date: 'Oct 04, 2024',
    icon: addIcon,
  },
  {
    id: 5,
    title: 'Transfer from CAD Wallet to an External CAD Account',
    amount: '- $100',
    date: 'Oct 08, 2024',
    icon: minusIcon,
  },
  {
    id: 6,
    title: 'CAD Funding from direct deposit',
    amount: '+ $100',
    date: 'Oct 04, 2024',
    icon: addIcon,
  },
];
