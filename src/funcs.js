import axios from 'axios';
import $ from 'jquery';
import DangerArrow from './components/Fragments/DangerArrow';
import SuccessArrow from './components/Fragments/SuccessArrow';
import InwardNotif from './components/Fragments/InwardNotif';
import OutwardNotif from './components/Fragments/OutwardNotif';
// import DangerArrow from './components/Fragments/DangerArrow';
// const SuccessArrow = () => '';
// const InwardNotif = () => '';
// const OutwardNotif = () => '';
// const DangerArrow = () => '';

export const sayhello = () => {
  console.log('Funcs Loaded!');
};

// Dynamically add loading style to button
export const btnProcessing = (el, cb) => {
  $(el).attr('disabled', true);
  $(el).html(
    '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span><span> Loading... </span>',
  );
  cb();
};
// Dynamically remove navbar
export const hideNavbar = () => {
  const x = $('.clb-close')[0];
  if (x !== undefined) {
    x.click();
  }
  const arrow = $('.toggle-active')[0];
  if (arrow !== undefined) {
    arrow.click();
  }
};

// Reset dynamically added styles and calls callback function
export const postProcessed = (e, cb) => {
  const elem = $(e.target);
  const prev = elem.html();
  btnProcessing(elem, async () => {
    const trigger = createModalTrigger(await cb());
    elem.parent().append(trigger);
    elem.removeAttr('disabled');
    elem.html(prev);
    trigger.click();
    trigger.remove();
  });
};

// Creates a modal trigger button
export const createModalTrigger = (id) => {
  const trigger = $(`<a data-toggle="modal" data-target="#${id}" style="display: none;"></a>`)[0];
  return trigger;
};

// My Axios Connection
export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// Login Function
export const loginRequest = (e) => {
  e.preventDefault();
  http.defaults.withCredentials = true;
  http.get('/sanctum/csrf-cookie').then((response) => {
    // Login POST REQUEST
    http
      .post('/login', {
        /* email: 'admin@admin.com',
                password: 'adminadmin' */
        email: 'john',
        password: 'adminadmin',
      })
      .then((response) => {
        localStorage.setItem('isLoggedIn', true);
        // window.location.replace("dashboard");
      })
      .catch((error) => console.log('Incorrect Login. ' + error));
  });
};

// Logout Function
export const logoutRequest = () => {
  // Call API Logout Route
  http.get('/api/logout', { withCredentials: true }).then((response) => {
    console.log(response.data);
  });
  // Set Login Variable to FALSE
  localStorage.setItem('isLoggedIn', false);
  localStorage.setItem('is2faed', false);
  // setUser(undefined);
  console.log('You are logged out!');
};

// This Function is to Login the user
export const registerRequest = (e) => {
  e.preventDefault();
  http.defaults.withCredentials = true;
  http.get('/sanctum/csrf-cookie').then((response) => {
    // Register POST REQUEST
    http
      .post('/register', {
        username: 'ggttr',
        fname: 'Michael',
        lname: 'Jackson',
        email: 'rtyye@gmail.com',
        password: 'adminadmin',
        password_confirmation: 'adminadmin',
        referrer: '',
      })
      .then((response) => {
        console.log(response);
        fetchUser();
        localStorage.setItem('isLoggedIn', true);
      })
      .catch((error) => console.log(error));
  });
};

// Fetch User Data
export const fetchUser = async () => {
  return http.get('/api/user', { withCredentials: true });
};

// Fetch Site Settings
export const fetchSettings = () => {
  return http.get('/api/settings', { withCredentials: true });
};

// Fetch Site P2P Settings
export const fetchP2pSettings = () => {
  return http.get('/api/settings/p2p', { withCredentials: true });
};

// Transaction Exports
export const withdrawFund = async (e, address) => {
  e.preventDefault();

  const elem = $(e.target);
  const data = {};

  const form = elem.closest('form');

  form.find('input').each((index, el) => {
    el = $(el);
    const name = el.attr('name');
    const value = el.val();
    data[name] = value;
  });

  data['method_name'] = 'default';
  data['detail'] = address;
  data['fee'] = 0;

  http.defaults.withCredentials = true;

  await http.get('/sanctum/csrf-cookie');
  try {
    const response = await http.post('/api/withdraw', data);
    form[0].reset(); // Clear Field
    if (response.data === 'Insufficient balance') {
      return { info: 'IB', data: response.data };
    } else {
      return { info: 'S', data: response.data };
    }
  } catch (error) {
    return { error: error.response.data.errors ? error.response.data.errors : error.response.data };
  }
};
export const depositFund = async (e) => {
  e.preventDefault();

  const amount = $('#amount').val();
  const gateway_id = $('#gateway_id').val();

  // Send the Request
  http.defaults.withCredentials = true;
  try {
    await http.get('/sanctum/csrf-cookie');
    // Register POST REQUEST
    const response = await http.post('/api/deposit', {
      amount: amount,
      gateway_id: gateway_id,
    });
    return response.data;
  } catch (error) {
    return { error: error };
  }
};

export const transferFund = async (e, address) => {
  e.preventDefault();

  const data = {};

  const amount = $('#rec-amount').val();
  const username = $('#rec-username').val();
  data['amount'] = amount;
  data['username'] = username;

  data['detail'] = address;

  http.defaults.withCredentials = true;

  await http.get('/sanctum/csrf-cookie');
  try {
    const response = await http.post('/api/user-transfer-fund', data);
    if (response.data === 'Insufficient balance') {
      return { info: 'IB', data: response.data };
    } else {
      return { info: 'S', data: response.data };
    }
  } catch (error) {
    return { error: error.response.data.errors ? error.response.data.errors : error.response.data };
  }
};

export const submitKYCData = async (fd) => {
  // Send the Request
  http.defaults.withCredentials = true;
  try {
    await http.get('/sanctum/csrf-cookie');
    // Register POST REQUEST
    const response = await http.post('/api/kyc/upload', fd);
    return response.data;
  } catch (error) {
    return { error: error };
  }
};

export const submitGoalData = async (fd) => {
  // Send the Request
  http.defaults.withCredentials = true;
  try {
    await http.get('/sanctum/csrf-cookie');
    // Register POST REQUEST
    const response = await http.post('/api/goal/upload', fd);
    return response.data;
  } catch (error) {
    return { error: error };
  }
};

export const uploadPhotoData = async (fd) => {
  // Send the Request
  http.defaults.withCredentials = true;
  try {
    await http.get('/sanctum/csrf-cookie');
    // Register POST REQUEST
    const response = await http.post('/api/profile/upload', fd);
    return response.data;
  } catch (error) {
    return { error: error };
  }
};

export const submitNewsData = async (fd) => {
  // Send the Request
  http.defaults.withCredentials = true;
  try {
    await http.get('/sanctum/csrf-cookie');
    // Register POST REQUEST
    const response = await http.post('/api/news', fd);
    return response.data;
  } catch (error) {
    return { error: error };
  }
};

export const editNewsData = async (fd, id) => {
  // Send the Request
  http.defaults.withCredentials = true;

  try {
    await http.get('/sanctum/csrf-cookie');
    // Send PATCH REQUEST
    const response = await http.patch('/api/news/' + id, fd);
    return response.data;
  } catch (error) {
    return { error: error };
  }
};

export const submitPOPData = async (fd) => {
  // Send the Request
  http.defaults.withCredentials = true;
  try {
    await http.get('/sanctum/csrf-cookie');
    // Register POST REQUEST
    const response = await http.post('/api/p2p/user/pop', fd);
    return response.data;
  } catch (error) {
    return { error: error };
  }
};

export const loadScript = (src) => {
  var tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  document.body.appendChild(tag);
  // document.body.removeChild(tag);
};

export const paginate = (totalItems, currentPage = 1, pageSize = 10, maxPages = 10) => {
  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage, endPage;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  let pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

  // return object with all pager properties required by the view
  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages,
  };
};

// Get Transaction Type Text
export const transName = (param) => {
  switch (param) {
    case '1':
      return 'Deposit';
    case '2':
      return 'Acc. Activation';
    case '3':
      return 'Investment';
    case '4':
      return 'Pledge Donations';
    case '5':
      return 'Admin Top Up';
    case '6':
      return 'Inv. Return';
    case '7':
      return 'Referral Bonus';
    case '8':
      return 'BV Bonus';
    case '9':
      return 'Pledge Received';
    case '10':
      return 'Received Fund';
    case '11':
      return 'Withdrawal';
    case '12':
      return 'Admin Sub. Fund';
    case '13':
      return 'N/A';
    case '14':
      return 'N/A';
    case '15':
      return 'N/A';
    case '16':
      return 'N/A';
    case '17':
      return 'N/A';
    case '18':
      return 'N/A';
    case '19':
      return 'Pledge Sent';
    case '20':
      return 'Transferred Fund';
    case '25':
      return 'POP Confirmed';
    case '26':
      return 'Donation Cycle Complete';
    case '61':
      return 'Support Replied';
    case '71':
      return 'Private Message';
    default:
      return 'N/A';
  }
};

// Get Transaction URL Text
export const transURL = (param) => {
  switch (param) {
    case '1':
      return 'deposit';
    case '2':
      return '#';
    case '3':
      return 'investments';
    case '4':
      return 'donation/transactions';
    case '5':
      return 'transactions';
    case '6':
      return 'transactions';
    case '7':
      return 'transactions';
    case '8':
      return 'transactions';
    case '9':
      return 'transactions';
    case '10':
      return 'transactions';
    case '11':
      return 'transactions';
    case '12':
      return 'transactions';
    case '13':
      return 'transactions';
    case '14':
      return 'transactions';
    case '15':
      return 'N/A';
    case '16':
      return 'N/A';
    case '17':
      return 'transactions';
    case '18':
      return 'transactions';
    case '19':
      return 'donation/transactions';
    case '20':
      return 'transactions';
    case '25':
      return '#';
    case '26':
      return 'donation/transactions';
    case '61':
      return 'support';
    case '71':
      return 'messages';
    default:
      return 'donation/transactions';
  }
};

// Get KYC Type Text
export const kycName = (param) => {
  switch (param) {
    case '1':
      return 'International Passport';
    case '2':
      return 'National ID';
    case '3':
      return 'Drivers License';
    default:
      return 'N/A';
  }
};

// Get Transaction Type Text
export const transPointer = (param) => {
  if (param > 0 && param <= 10) {
    return <SuccessArrow />;
  } else if (param > 10 && param < 21) {
    return <DangerArrow />;
  } else {
    return <SuccessArrow />;
  }
};

// Get Notification Icon Type
export const notifPointer = (param) => {
  if (param > 0 && param <= 10) {
    return <InwardNotif />;
  } else if (param > 10 && param < 21) {
    return <OutwardNotif />;
  } else {
    return <InwardNotif />;
  }
};

// Convert a digit to 2 digits e.g 8 to 08
const to2Digits = (unit) => `0${unit}`.slice(-2);

// Milliseconds to Hour, Minutes and seconds
export const parseMilli = (msec) => {
  let hour = Math.floor(msec / 1000 / 60 / 60);
  msec -= hour * 1000 * 60 * 60;

  let mins = Math.floor(msec / 1000 / 60);
  msec -= mins * 1000 * 60;

  let seconds = Math.floor(msec / 1000);
  msec -= seconds * 1000;
  if (hour.toString().includes('-')) {
    return ['00', '00', '00', '00'];
  } else {
    return [to2Digits(hour), to2Digits(mins), to2Digits(seconds), to2Digits(msec)];
  }
};

// Get Date, Month and Year from db timestamp
export const timestampFormatted = (time) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const timestamp = new Date(time);
  const date = timestamp.getDate();
  const month = monthNames[timestamp.getMonth()];
  const year = timestamp.getFullYear();
  const timeValue = timestamp.getHours() + ':' + timestamp.getMinutes() + ':' + timestamp.getSeconds() + 's';

  return [date, month, year, timeValue];
};

export default sayhello;
