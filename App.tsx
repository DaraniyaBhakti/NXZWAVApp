import React from 'react';

import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../components/src/HomeScreen';
import InfoPage from '../blocks/info-page/src/InfoPageBlock';
import Subtitles from '../blocks/subtitles/src/Subtitles';
import CustomisableUserProfiles from '../blocks/CustomisableUserProfiles/src/CustomisableUserProfiles';
import Repost from '../blocks/Repost/src/Repost';
import Leaderboard from '../blocks/Leaderboard/src/Leaderboard';
import StripeIntegration from '../blocks/StripeIntegration/src/StripeIntegration';
import AppleLogin2 from '../blocks/AppleLogin2/src/AppleLogin2';
import GameScore2 from '../blocks/GameScore2/src/GameScore2';
import Gamification from '../blocks/Gamification/src/Gamification';
import FriendList from '../blocks/FriendList/src/FriendList';
import NavigationMenu from '../blocks/navigationmenu/src/NavigationMenu';
import Pushnotifications from '../blocks/pushnotifications/src/Pushnotifications';
import DeepLinking from '../blocks/DeepLinking/src/DeepLinking';
import ActivityFeed from '../blocks/ActivityFeed/src/ActivityFeed';
import Notifications from '../blocks/notifications/src/Notifications';
import Analytics from '../blocks/analytics/src/Analytics';
import PostCreation from '../blocks/postcreation/src/PostCreation';
import Posts from '../blocks/postcreation/src/Posts';
import PostDetails from '../blocks/postcreation/src/PostDetails';
import Trending from '../blocks/Trending/src/Trending';
import Settings5 from '../blocks/Settings5/src/Settings5';
import UserProfileBasicBlock from '../blocks/user-profile-basic/src/UserProfileBasicBlock';
import Categoriessubcategories from '../blocks/categoriessubcategories/src/Categoriessubcategories';
import TermsAndConditions3 from '../blocks/TermsAndConditions3/src/TermsAndConditions3';
import AddFriends from '../blocks/AddFriends/src/AddFriends';
import CountryCodeSelector from '../blocks/country-code-selector/src/CountryCodeSelector';
import CountryCodeSelectorTable from '../blocks/country-code-selector/src/CountryCodeSelectorTable';
import Share from '../blocks/share/src/Share';
import UploadMedia2 from '../blocks/UploadMedia2/src/UploadMedia2';
import AdminConsole from '../blocks/AdminConsole/src/AdminConsole';
import StripeGatewayApiFrontend from '../blocks/StripeGatewayApiFrontend/src/StripeGatewayApiFrontend';
import EducationalUserProfile from '../blocks/educational-user-profile/src/EducationalUserProfile';
import Chat9 from '../blocks/Chat9/src/Chat9';
import Dashboard from '../blocks/dashboard/src/Dashboard';
import Splashscreen from '../blocks/splashscreen/src/Splashscreen';
import Hashtags from '../blocks/Hashtags/src/Hashtags';
import Search from '../blocks/search/src/Search';
import Upvotedownvote from '../blocks/Upvotedownvote/src/Upvotedownvote';
import PhotoLibrary3 from '../blocks/PhotoLibrary3/src/PhotoLibrary3';
import Comments from '../blocks/comments/src/Comments';
import CreateComment from '../blocks/comments/src/CreateComment';
import InappPurchasing from '../blocks/InappPurchasing/src/InappPurchasing';
import AccountLoginScreen from '../blocks/email-account-login/src/EmailAccountLoginBlock';
import AddCategories from '../blocks/UploadMedia2/src/AddCategories';
import EditWavPostCreation from '../blocks/UploadMedia2/src/EditWavPostCreation';
import SingleTagStream from '../blocks/search/src/SingleTagStream';
import Chat from '../blocks/chat/src/Chat';
import ChatNew from '../blocks/chat/src/ChatNew';
import ChatView from '../blocks/chat/src/ChatView';
import PmChatView from '../blocks/chat/src/PmChatView';
import PMCompose from '../blocks/chat/src/PMCompose';
import GamifiedWallet from '../blocks/Gamification/src/GamifiedWallet';
import WalletSwitch from '../blocks/Gamification/src/WalletSwitch';
import WalletSend from '../blocks/Gamification/src/WalletSend';
import WalletSentMessage from '../blocks/Gamification/src/WalletSentMessage';
import SearchUser from '../blocks/Gamification/src/SearchUser';
import BuyPoints from '../blocks/Gamification/src/BuyPoints';
const HomeStack = createStackNavigator({

  Home: { screen: HomeScreen, navigationOptions: { header: null, title: 'Home' } },
  Splashscreen: {
    screen: Splashscreen,
    navigationOptions: { title: 'Splashscreen' },
  },
  Subtitles: { screen: Subtitles, navigationOptions: { title: 'Subtitles' } },
  CustomisableUserProfiles: {
    screen: CustomisableUserProfiles,
    navigationOptions: { title: 'CustomisableUserProfiles' },
  },
  Repost: { screen: Repost, navigationOptions: { title: 'Repost' } },
  Leaderboard: { screen: Leaderboard, navigationOptions: { title: 'Leaderboard' } },
  StripeIntegration: {
    screen: StripeIntegration,
    navigationOptions: { title: 'StripeIntegration' },
  },
  AppleLogin2: { screen: AppleLogin2, navigationOptions: { title: 'AppleLogin2' } },
  GameScore2: { screen: GameScore2, navigationOptions: { title: 'GameScore2' } },
  Gamification: {
    screen: Gamification,
    navigationOptions: { header: null, title: 'Gamification' },
  },
  FriendList: { screen: FriendList, navigationOptions: { title: 'FriendList' } },
  NavigationMenu: {
    screen: NavigationMenu,
    navigationOptions: { title: 'NavigationMenu' },
  },
  Pushnotifications: {
    screen: Pushnotifications,
    navigationOptions: { title: 'Pushnotifications' },
  },
  DeepLinking: { screen: DeepLinking, navigationOptions: { title: 'DeepLinking' } },
  ActivityFeed: {
    screen: ActivityFeed,
    navigationOptions: { title: 'ActivityFeed' },
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: { title: 'Notifications' },
  },
  Analytics: { screen: Analytics, navigationOptions: { title: 'Analytics' } },
  PostCreation: {
    screen: PostCreation,
    navigationOptions: { header: null, title: 'PostCreation' },
  },
  Posts: { screen: Posts, navigationOptions: { title: 'Posts' } },
  PostDetails: { screen: PostDetails, navigationOptions: { title: 'PostDetails' } },
  Trending: { screen: Trending, navigationOptions: { title: 'Trending' } },
  Settings5: { screen: Settings5, navigationOptions: { title: 'Settings5' } },
  UserProfileBasicBlock: {
    screen: UserProfileBasicBlock,
    navigationOptions: { title: 'UserProfileBasicBlock' },
  },
  Categoriessubcategories: {
    screen: Categoriessubcategories,
    navigationOptions: { header: null, title: 'Categoriessubcategories' },
  },
  TermsAndConditions3: {
    screen: TermsAndConditions3,
    navigationOptions: { title: 'TermsAndConditions3' },
  },
  AddFriends: { screen: AddFriends, navigationOptions: { title: 'AddFriends' } },
  CountryCodeSelector: {
    screen: CountryCodeSelector,
    navigationOptions: { title: 'CountryCodeSelector' },
  },
  CountryCodeSelectorTable: {
    screen: CountryCodeSelectorTable,
    navigationOptions: { title: 'CountryCodeSelectorTable' },
  },
  Share: { screen: Share, navigationOptions: { title: 'Share' } },
  UploadMedia2: {
    screen: UploadMedia2,
    navigationOptions: { header: null, title: 'UploadMedia2' },
  },
  AdminConsole: {
    screen: AdminConsole,
    navigationOptions: { title: 'AdminConsole' },
  },
  StripeGatewayApiFrontend: {
    screen: StripeGatewayApiFrontend,
    navigationOptions: { title: 'StripeGatewayApiFrontend' },
  },
  EducationalUserProfile: {
    screen: EducationalUserProfile,
    navigationOptions: { title: 'EducationalUserProfile' },
  },
  Chat9: { screen: Chat9, navigationOptions: { title: 'Chat9' } },
  Dashboard: { screen: Dashboard, navigationOptions: { title: 'Dashboard' } },

  Hashtags: { screen: Hashtags, navigationOptions: { header: null, title: 'Hashtags' } },
  Search: { screen: Search, navigationOptions: { header: null, title: 'Search' } },
  Upvotedownvote: {
    screen: Upvotedownvote,
    navigationOptions: { title: 'Upvotedownvote' },
  },
  PhotoLibrary3: {
    screen: PhotoLibrary3,
    navigationOptions: { title: 'PhotoLibrary3' },
  },
  Comments: { screen: Comments, navigationOptions: { title: 'Comments' } },
  CreateComment: {
    screen: CreateComment,
    navigationOptions: { title: 'CreateComment' },
  },
  InappPurchasing: {
    screen: InappPurchasing,
    navigationOptions: { title: 'InappPurchasing' },
  },

  InfoPage: { screen: InfoPage, navigationOptions: { title: 'Info' } },
  AccountLoginScreen: { screen: AccountLoginScreen, navigationOptions: { header: null, title: 'Login Screen' } },
  AddCategories: { screen: AddCategories, navigationOptions: { header: null, title: 'Add Categories' } },
  EditWavPostCreation: { screen: EditWavPostCreation, navigationOptions: { header: null, title: 'Edit Wav' } },
  SingleTagStream: { screen: SingleTagStream, navigationOptions: { header: null, title: 'Single Tag Stream' } },
  Chat: { screen: Chat, navigationOptions: { header: null, title: 'Chat' } },
  ChatNew: { screen: ChatNew, navigationOptions: { header: null, title: 'ChatNew' } },
  ChatView: { screen: ChatView, navigationOptions: { header: null, title: 'ChatView' } },
  PmChatView: { screen: PmChatView, navigationOptions: { header: null, title: 'PmChatView' } },
  PMCompose: { screen: PMCompose, navigationOptions: { header: null, title: 'PMCompose' } },
  GamifiedWallet: { screen: GamifiedWallet, navigationOptions: { header: null, title: 'Gamified Wallet' } },
  WalletSwitch: { screen: WalletSwitch, navigationOptions: { header: null, title: 'Wallet Switch' } },
  WalletSend: { screen: WalletSend, navigationOptions: { header: null, title: 'Wallet Send' } },
  WalletSentMessage: { screen: WalletSentMessage, navigationOptions: { header: null, title: 'Wallet Sent Message' } },
  SearchUser: { screen: SearchUser, navigationOptions: { header: null, title: 'Search User' } },
  BuyPoints: { screen: BuyPoints, navigationOptions: { header: null, title: 'Buy Points' } },
});

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: 'HomeScreen',
  };
  const homeScreen = new HomeScreen(defaultProps);
}

export function App() {
  return <HomeStack />;
}
