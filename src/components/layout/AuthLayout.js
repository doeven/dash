import React, {useState} from 'react';
import toastr from 'toastr';
import { Route, Redirect } from 'react-router-dom';
import { http } from '../../funcs';
export { logoutRequest } from '../../funcs';


const AuthLayout = ({ children, user, settings }) => {
  return <>{children}</>;
};

 
const AuthLayoutRoute = ({
  component: Component,
  user: user,
  settings: settings,
  forced: forced,
  title: title,
  ...rest
}) => {
  document.title = title;

  const [check, setCheck] = useState('Logged Out Session');

  const code_check = () => {
    http.get('/sanctum/csrf-cookie').then((response) => {
      http
        .get('/api/user/session/check')
        .then(({ data }) => {
          setCheck(data)
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
              timeOut: '4000',
              extendedTimeOut: '4000',
              showEasing: 'swing',
              hideEasing: 'linear',
            };
            toastr.error(error.response.data);
        });
    });
  }

  if (user) {
    code_check();
    if(check === 'Logged In Session'){
      if (rest.location.state) {
        return <Redirect to={rest.location.state.prev} />;
      } else {
        return <Redirect to={process.env.REACT_APP_USE_DASHBOARD} />;
      }
    }else{
      if(user.twofa_type === 2){
        if(localStorage.getItem('is2faed') === "true"){
          if (rest.location.state) {
            return <Redirect to={rest.location.state.prev} />;
          } else {
            return <Redirect to={process.env.REACT_APP_USE_DASHBOARD} />;
          }
        }
      }else{

        if (rest.location.state) {
          return <Redirect to={rest.location.state.prev} />;
        } else {
          return <Redirect to={process.env.REACT_APP_USE_DASHBOARD} />;
        }


      } 
    }
  }
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <AuthLayout user={{ ...user }}>
          <Component {...matchProps} user={{ ...user }} settings={{ ...settings }} forced={forced} />
        </AuthLayout>
      )}
    />
  );
};

export default AuthLayoutRoute;
