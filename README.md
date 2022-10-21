## .Env
Both .env and .env.production should be placed in the root directory. Also, make sure to match your subdomain accordingly. Refer to Ghost Clan API for the backend and authentication

### .env file (for Local Host dev)

    PORT=5000
    REACT_APP_WEB_APP_NAME="Local Dashboard"
    REACT_APP_USE_DASHBOARD=dashboard
    REACT_APP_USE_MESSAGES=on
    REACT_APP_USE_PHOTO=''

    REACT_APP_WEB_HOME=http://localhost:8888
    REACT_APP_WEB_APP_URL=http://localhost:5000
    REACT_APP_API_URL=http://localhost:8000

### .env.production file (for Production server )

    PORT=5000
    REACT_APP_WEB_APP_NAME="Doeven Investments"
    REACT_APP_USE_DASHBOARD=dashboard
    REACT_APP_USE_MESSAGES=on
    REACT_APP_USE_PHOTO=/public

    REACT_APP_WEB_HOME=https://doeveninvestments.com
    REACT_APP_WEB_APP_URL=https://app.doeveninvestments.com
    REACT_APP_API_URL=https://api.doeveninvestments.com