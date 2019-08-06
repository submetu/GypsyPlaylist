import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonIcon from '@material-ui/icons/Person';
import classNames from 'classnames';
import queryString from 'querystring';
import React, { useContext, useState } from 'react';
import { AppContext } from '../core/AppContextProvider';

export function Login() {
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(AppContext);

  function onClick() {
    setLoading(true);
    fetch('/login', {
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Accept: '*',
      },
      mode: 'no-cors',
    })
      .then(resp => resp.json())
      .then(data => {
        const baseURL = 'https://accounts.spotify.com/authorize?';
        const query = queryString.stringify(data);
        window.location.href = baseURL + query;
      })
      .catch(error => {
        setLoading(false);
        throw new Error(error);
      });
  }

  return (
    <div className={classNames('Login', theme.background)}>
      <div className="Login_spotify">
        <Button
          classes={{ disabled: theme.disabled }}
          className={theme.button}
          disabled={loading}
          size="large"
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          <PersonIcon />
          Login
        </Button>
        {loading && <CircularProgress size={24} className={theme.primaryColor} />}
      </div>
    </div>
  );
}
