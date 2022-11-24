import { gapi } from 'gapi-script';
import { GoogleLogin } from '@leecheuk/react-google-login';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

export default function Google() {
  const clientId = '650635233178-jbpp6gmn7ug0hej6ov9qtfh46dlrmhk7.apps.googleusercontent.com';

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
      buttonText=""
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn
    />
  );
}
