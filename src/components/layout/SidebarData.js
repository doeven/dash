import { MdHome } from 'react-icons/md';
import { BsFillGearFill } from 'react-icons/bs';
import { AiTwotonePieChart, AiTwotoneGold } from 'react-icons/ai';
import { FaUserAlt, FaUserCog, FaRegMoneyBillAlt, FaCommentAlt, FaListOl } from 'react-icons/fa';
import { GoPackage } from 'react-icons/go';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdHome />,
  },
  {
    title: 'Deposit',
    path: '/deposit',
    icon: <FaRegMoneyBillAlt />,
  },
  {
    title: 'Withdraw',
    path: '/',
    icon: <RiMoneyDollarCircleFill />,
  },
  {
    title: 'Investment Packages',
    path: '/invest',
    icon: <GoPackage />,
  },
  {
    title: 'My Investments',
    path: '/investment',
    icon: <FaListOl />,
  },
  {
    title: 'My Transactions',
    path: '/transactions',
    icon: <AiTwotonePieChart />,
  },

  {
    title: 'Referrals',
    path: '/referrals',
    icon: <AiTwotoneGold />,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <FaUserAlt />,
  },
  {
    title: 'Security',
    path: '/security',
    icon: <BsFillGearFill />,
  },
  // {
  //   title: 'Admin',
  //   path: '/admin',
  //   icon: <FaUserCog />,
  // },
  {
    title: 'Support',
    path: '/support',
    icon: <FaCommentAlt />,
  },
];
export default SidebarData;
