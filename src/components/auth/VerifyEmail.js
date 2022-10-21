import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { http } from '../../funcs';
import toastr from 'toastr';
import $ from 'jquery';
import queryString from 'query-string';

function EmailVerify(props, { forced }) {
  // Get Query Strings
  const value = queryString.parse(props.location.search);

  const id = props.match.params.id;
  const hash = props.match.params.hash;
  /* const email = value.email;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); */

  // toast.success('Success Message');
  const ResendVerification = (e) => {
    e.preventDefault();
    http.get('/sanctum/csrf-cookie').then((response) => {
      http
        .post('/email/verification-notification ', {})
        .then((response) => {
          console.log(response);
          $('.sndReset').attr('disabled', true);
          toastr.options = {
            debug: false,
            newestOnTop: false,
            positionClass: 'toast-top-center',
            preventDuplicates: false,
            onclick: null,
            showDuration: '300',
            hideDuration: '1000',
            timeOut: '4000',
            extendedTimeOut: '4000',
            showEasing: 'swing',
            hideEasing: 'linear',
          };
          toastr.success(response.data.message);
        })
        .catch((error) => {
          console.log(error);
          // Display an info toast with no title
          toastr.options = {
            debug: false,
            newestOnTop: false,
            positionClass: 'toast-top-center',
            preventDuplicates: false,
            onclick: null,
            showDuration: '300',
            hideDuration: '1000',
            timeOut: '5000',
            extendedTimeOut: '5000',
            showEasing: 'swing',
            hideEasing: 'linear',
          };
          toastr.error(error);
        });
    });
  };
  return (
    <div className="nk-app-root">
      {/* <!-- main @s --> */}
      <div className="nk-main ">
        {/* <!-- wrap @s --> */}
        <div className="nk-wrap nk-wrap-nosidebar">
          <div className="nk-content ">
            <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
              <div className="brand-logo pb-4 text-center">
                <Link to="/dashboard" className="logo-link">
                  <img
                    className="logo-light logo-img logo-img-lg"
                    src="../images/logo.png"
                    srcset="../images/logo2x.png 2x"
                    alt="logo"
                  />
                  <img
                    className="logo-dark logo-img logo-img-lg"
                    src="../images/logo-dark.png"
                    srcset="../images/logo-dark2x.png 2x"
                    alt="logo-dark"
                  />
                </Link>
              </div>
              <div className="card card-bordered">
                <div className="card-inner card-inner-lg">
                  <div className="nk-block-head">
                    <div className="nk-block-head-content">
                      <h5 className="nk-block-title">Reset password</h5>
                      <div className="nk-block-des">
                        <p>
                          If you forgot your password, well, then we’ll email you instructions to reset your password.
                        </p>
                      </div>
                    </div>
                  </div>
                  <form action="">
                    <div className="form-group">
                      <button className="btn btn-lg btn-primary btn-block sndReset" onClick={ResendVerification}>
                        Resend Verification
                      </button>
                    </div>
                  </form>
                  <div className="form-note-s2 text-center pt-4">
                    <Link to="/login">
                      <strong>Return to login</strong>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="nk-footer nk-auth-footer-full">
              <div className="container wide-lg">
                <div className="row g-3">
                  <div className="col-lg-6 order-lg-last">
                    <ul className="nav nav-sm justify-content-center justify-content-lg-end">
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Terms & Condition
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Privacy Policy
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Help
                        </a>
                      </li>
                      <li className="nav-item dropup">
                        <a
                          className="dropdown-toggle dropdown-indicator has-indicator nav-link"
                          data-toggle="dropdown"
                          data-offset="0,10"
                        >
                          <span>English</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                          <ul className="language-list">
                            <li>
                              <a href="#" className="language-item">
                                <img src="./images/flags/english.png" alt="" className="language-flag" />
                                <span className="language-name">English</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="language-item">
                                <img src="./images/flags/spanish.png" alt="" className="language-flag" />
                                <span className="language-name">Español</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="language-item">
                                <img src="./images/flags/french.png" alt="" className="language-flag" />
                                <span className="language-name">Français</span>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="language-item">
                                <img src="./images/flags/turkey.png" alt="" className="language-flag" />
                                <span className="language-name">Türkçe</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <div className="nk-block-content text-center text-lg-left">
                      <p className="text-soft">&copy; 2021 {props.settings.title}. All Rights Reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- content @e --> */}
      </div>
      {/* <!-- main @e --> */}
    </div>
  );
}

export default EmailVerify;
