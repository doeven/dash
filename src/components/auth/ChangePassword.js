import { useState } from 'react';
import { Link } from 'react-router-dom';

import { http } from '../../funcs';
import toastr from 'toastr';
import $ from 'jquery';
import queryString from 'query-string';

function ChangePassword(props, { forced }) {
  // Get Query Strings
  const value = queryString.parse(props.location.search);

  const token = props.match.params.id;
  const email = value.email;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changed, setChanged] = useState(0);

  // toast.success('Success Message');
  const ResetPassword = (e) => {
    let displayError;
    e.preventDefault();
    $('.sndReset').attr('disabled', true);
    http.get('/sanctum/csrf-cookie').then((response) => {
      http
        .post('/reset-password ', {
          token: token,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        })
        .then((response) => {
          setChanged(1);
          $('#formChange').hide();
          $('.nk-block-des').hide();
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
          console.log(response);
        })
        .catch((error) => {
          $('.sndReset').attr('disabled', false);

          if (error.response.data.errors.email) {
            displayError = 'You followed an Expired password reset link';
          }
          if (error.response.data.errors.password) {
            displayError = error.response.data.errors.password;
          }
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
          toastr.error(displayError);
        });
    });
  };
  return (
    <div className="nk-content ">
      <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <a href="html/index.html" className="logo-link">
            <img
              className="logo-light logo-img logo-img-lg"
              src="./images/logo.png"
              srcset="./images/logo2x.png 2x"
              alt="logo"
            />
            <img
              className="logo-dark logo-img logo-img-lg"
              src="./images/logo-dark.png"
              srcset="./images/logo-dark2x.png 2x"
              alt="logo-dark"
            />
          </a>
        </div>
        <div className="card card-bordered">
          <div className="card-inner card-inner-lg">
            <div className="nk-block-head">
              <div className="nk-block-head-content">
                <h5 className="nk-block-title">Reset password</h5>
                <div className="nk-block-des">
                  <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                </div>
              </div>
            </div>
            <form action="">
              {changed == 1 && (
                <div className="alert alert-success">
                  <strong>
                    You have successfully reset your password. You can <Link to="/login">Login Here</Link>
                  </strong>
                </div>
              )}

              <div id="formChange">
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" for="password">
                      New Password
                    </label>
                  </div>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    name="password"
                    placeholder="Enter New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <div className="form-label-group">
                    <label className="form-label" for="confirm_password">
                      Retype New Password
                    </label>
                  </div>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-lg btn-primary btn-block sndReset" onClick={ResetPassword}>
                    Change Password
                  </button>
                </div>
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
                <p className="text-soft">&copy; 2022 {props.settings.title}. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
