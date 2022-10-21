function PasswordChanged(props, { forced }) {
  return (
    <div className="nk-content ">
      <div className="nk-block nk-block-middle nk-auth-body">
        <div className="brand-logo pb-5">
          <a href="/" className="logo-link">
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
        <div className="nk-block-head">
          <div className="nk-block-head-content">
            <h4 className="nk-block-title">Thank you for submitting the form</h4>
            <div className="nk-block-des text-success">
              <p>You can now sign in with your new password</p>
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

export default PasswordChanged;
