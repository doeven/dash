import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { fetchUser, fetchSettings, fetchP2pSettings } from './funcs';
import './App.css';

import LoginLayoutRoute from './components/layout/AuthLayout';
import DashboardLayoutRoute from './components/layout/Layout';

import Dashboard from './components/user/Dashboard';
import Chat from './components/user/Chat';
import ChatNew from './components/user/ChatNew';
import Investment from './components/user/Investment';
import InvestmentPackage from './components/user/InvestmentPackage';
import Financial from './components/user/Financial';
import Profile from './components/user/Profile';
import Referral from './components/user/Referral';
import Transaction from './components/user/Transaction';
import Deposit from './components/user/Deposit';
import Security from './components/user/Security';
import UserAlerts from './components/user/Alerts';
import KycUser from './components/user/Kyc';
import Support from './components/user/Support';
import NewTicket from './components/user/NewTicket';
import Messages from './components/Messages';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import VerifyEmail from './components/auth/VerifyEmail';
import VerifyEmailLink from './components/auth/VerifyEmailLink';
import PasswordReset from './components/auth/PasswordReset';
import ChangePassword from './components/auth/ChangePassword';
import PasswordChanged from './components/auth/PasswordChanged';
import Suspended from './components/auth/Suspended';

// admin
import AdminDashboard from './components/admin/Dasboard';
// import Email from './components/admin/Email';
// import InvestmentAdmin from './components/admin/Investment';
import UserAdmin from './components/admin/User';
import AdminUserProfile from './components/admin/UserEdit';
import EmailTemp from './components/admin/EmailTemp';
import EditEmail from './components/admin/EditEmail';
import NewEmail from './components/admin/NewEmail';
import Alerts from './components/admin/Alerts';
// import EditAlert from './components/admin/EditAlert';
import NewAlert from './components/admin/NewAlert';
import Pages from './components/admin/Pages';
import EditPage from './components/admin/EditPage';
import NewPage from './components/admin/NewPage';
import News from './components/admin/News';
import EditNews from './components/admin/EditNews';
import NewNews from './components/admin/NewNews';
import SendEmail from './components/admin/SendEmail';
import SendUserEmail from './components/admin/SendUserEmail';
import WithdrawalAdmin from './components/admin/Withdrawal';
import Kyc from './components/admin/Kyc';
import Goals from './components/admin/Goals';
import InvestmentPackages from './components/admin/InvestmentPackages';
import MatchUsers from './components/admin/MatchUsers';
import Donors from './components/admin/Donors';
import Recievers from './components/admin/Reciever';
import DonationPackages from './components/admin/DonationPackages';
import TransactionAdmin from './components/admin/Transaction';
import Gateway from './components/admin/Gateway';
import WithdrawMethod from './components/admin/WithdrawMethod';
import DepositLog from './components/admin/DepositLog';
import SiteSettings from './components/admin/SiteSettings';
import ViewSupport from './components/admin/ViewSupport';
import SupportDetails from './components/admin/SupportDetails';
import P2Psettings from './components/admin/P2Psettings';

const App = (props) => {
  // console.log(props.user)
  const [user, setUser] = useState('');
  const [reload, setReload] = useState(true);
  const [settings, setSettings] = useState();
  const [p2pSettings, setP2pSettings] = useState();

  useEffect(() => {
    // Fetch Logged In User Data
    const fetch = async () => {
      try {
        const res = await fetchUser();
        setUser(res.data);
      } catch (error) {
        // console.log(error.message);
        setUser(undefined);
      }

      // Fetch Site Settings
      try {
        const res = await fetchSettings();
        setSettings(res.data);
      } catch (error) {
        // console.log(error);
        setUser(undefined);
      }

      // Fetch P2p Settings
      try {
        const res = await fetchP2pSettings();
        setP2pSettings(res.data);
      } catch (error) {
        // console.log(error);
        setUser(undefined);
      }
    };

    fetch();
  }, [reload]);

  const reloadUpdate = () => {
    setReload(!reload);
  };

  return (
    // make route dynamic
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <LoginLayoutRoute
            path="/login"
            component={Login}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Login - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <LoginLayoutRoute
            path="/register"
            component={Register}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Register - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <LoginLayoutRoute
            path="/ref/:username"
            component={Register}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Register - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <Route
            path="/email/verify"
            exact={true}
            component={VerifyEmail}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Verify Your Email - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <LoginLayoutRoute
            path="/email/verify/:id/:hash"
            component={VerifyEmailLink}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Verify Your Email - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <LoginLayoutRoute
            path="/reset-password"
            exact={true}
            component={PasswordReset}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Reset Password - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <LoginLayoutRoute
            path="/reset-password/:id"
            component={ChangePassword}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Change Password - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <LoginLayoutRoute
            path="/password-changed"
            component={PasswordChanged}
            forced={reloadUpdate}
            settings={settings}
            title={`Password Successfully Changed - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/dashboard"
            component={Dashboard}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Dashboard - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            exact
            path="/messages"
            component={Chat}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Messaging - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            exact
            path="/messages/new/:id/:username"
            component={ChatNew}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`New Message - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            exact
            path="/investment"
            component={Investment}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Investments - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            exact
            path="/invest"
            component={InvestmentPackage}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Invest - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            exact
            path="/profile"
            component={Profile}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Profile - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/referrals"
            component={Referral}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`User Referrals - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            exact
            path="/security"
            component={Security}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Profile Security - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            exact
            path="/notifications/alerts"
            component={UserAlerts}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Alert Notifications - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            exact
            path="/kyc-update"
            component={KycUser}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`KYC Update - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            path="/transactions"
            component={Transaction}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Transactions - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            path="/deposit"
            component={Deposit}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Deposit - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            path="/messages"
            exact={true}
            component={Messages}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Messages - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            exact
            path="/support/new"
            component={NewTicket}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Open a New Ticket - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            path="/admin"
            exact={true}
            component={AdminDashboard}
            user={user}
            settings={settings}
            title={`Admin Dashboard - ${process.env.REACT_APP_WEB_APP_NAME}`}
            forced={reloadUpdate}
          />

          <DashboardLayoutRoute
            path="/admin/settings"
            exact={true}
            component={SiteSettings}
            user={user}
            settings={settings}
            title={`Site Settings - ${process.env.REACT_APP_WEB_APP_NAME}`}
            forced={reloadUpdate}
          />

          <DashboardLayoutRoute
            path="/admin/transactions"
            component={TransactionAdmin}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Users' Transactions - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            path="/admin/withdrawals"
            component={WithdrawalAdmin}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Users' Withdraw Requests - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            path="/admin/users"
            exact={true}
            component={UserAdmin}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Users List - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/user-profile/:id"
            exact={true}
            component={AdminUserProfile}
            user={user}
            settings={settings}
            title={`Edit User Profile - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/emails"
            component={EmailTemp}
            user={user}
            settings={settings}
            title={`Email Templates - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/edit-email"
            component={EditEmail}
            user={user}
            settings={settings}
            title={`Edit Email Template - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/new-email"
            component={NewEmail}
            user={user}
            settings={settings}
            title={`New Email Template - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/pages"
            component={Pages}
            user={user}
            settings={settings}
            title={`Pages - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/edit-page"
            component={EditPage}
            user={user}
            settings={settings}
            title={`Edit a Page - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/new-page"
            component={NewPage}
            user={user}
            settings={settings}
            title={`New Page - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/alerts"
            component={Alerts}
            user={user}
            settings={settings}
            title={`Alerts - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/edit-alert"
            component={EditPage}
            user={user}
            settings={settings}
            title={`Edit an Alert - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/new-alert"
            component={NewAlert}
            user={user}
            settings={settings}
            title={`New Alert - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/news"
            component={News}
            user={user}
            settings={settings}
            title={`News - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/edit-new"
            component={EditNews}
            user={user}
            settings={settings}
            title={`Edit a News - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/new-news"
            component={NewNews}
            user={user}
            settings={settings}
            title={`New News - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/send-email"
            component={SendEmail}
            user={user}
            settings={settings}
            title={`Send Email to All Users - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/send-single-email"
            component={SendUserEmail}
            user={user}
            settings={settings}
            title={`Send Single Email - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/investment-packages"
            component={InvestmentPackages}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Investment Packages - Admin - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/kyc/users"
            exact={true}
            component={Kyc}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Users' KYC - Admin - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/goals/users"
            exact={true}
            component={Goals}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Users' Goals - Admin - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            path="/admin/support"
            exact={true}
            component={ViewSupport}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Support - Admin - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            path="/admin/support/:id"
            exact={true}
            component={SupportDetails}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Support - Admin - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            path="/support/:id"
            exact={true}
            component={SupportDetails}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Support - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            path="/admin/gateways"
            component={Gateway}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Payment Gateways - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/gateways"
            component={WithdrawMethod}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Withdraw Gateways - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/p2p-settings"
            component={P2Psettings}
            user={user}
            settings={settings}
            p2p={p2pSettings}
            title={`P2P Settings - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />
          <DashboardLayoutRoute
            path="/admin/match/users"
            exact={true}
            component={MatchUsers}
            user={user}
            settings={settings}
            p2p={p2pSettings}
            forced={reloadUpdate}
            title={`Auto Match Users - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/p2p/donors"
            exact={true}
            component={Donors}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`All P2P Donors - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/p2p/receivers"
            exact={true}
            component={Recievers}
            user={user}
            settings={settings}
            p2p={p2pSettings}
            forced={reloadUpdate}
            title={`All P2P Receivers - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <DashboardLayoutRoute
            path="/admin/addresses-generated"
            exact={true}
            component={DepositLog}
            user={user}
            settings={settings}
            p2p={p2pSettings}
            forced={reloadUpdate}
            title={`Deposit Addresses Generated - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <Route exact path="/admin/donation-packages" component={DonationPackages} />
          <Route exact path="/admin/deposit-log" component={DepositLog} />
          {/* <Route exact path="/admin/email" component={Email} /> */}

          <DashboardLayoutRoute
            path="/support"
            exact={true}
            component={Support}
            user={user}
            settings={settings}
            forced={reloadUpdate}
            title={`Support - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <LoginLayoutRoute
            path="/suspended"
            component={Suspended}
            forced={reloadUpdate}
            settings={settings}
            title={`Account Suspended - ${process.env.REACT_APP_WEB_APP_NAME}`}
          />

          <Route exact path="/financial" component={Financial} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
