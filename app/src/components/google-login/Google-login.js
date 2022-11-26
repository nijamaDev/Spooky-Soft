import { gapi } from 'gapi-script';
import { GoogleLogin } from '@leecheuk/react-google-login';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

export default function Google() {
  const clientId = process.env.REACT_APP_CLIENT_ID;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    console.log('success:', res);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign In with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn
    />
  );
}
