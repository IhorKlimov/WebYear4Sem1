import logo from './logo.svg';
import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import UserInformation from './UserInformation';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';

function App() {
  const [account, setAccount] = useState(null);
  const [profile, setProfile] = useState({});
  const [state, setState] = useState(account === null ? "signUp" : "signedUp");

  function onResult(result) {
    console.log("Received result " + result);
    if (result.status === "signedUp") {
      setAccount(result.account);
      setState(result.status);
    } else if (result.status === "logOut") {
      setAccount(null);
      setState("signIn");
    } else if (result.status == "signIn") {
      setState(result.status);
    } else if (result.status == "signUp") {
      setState(result.status);
    } else if (result.status === "changePassword") {
      setState(result.status);
    } else if (result.status === "editProfile") {
      setProfile(result.profile);
      setState(result.status);
    }
  }

  return (
    <div className="App">
      {(() => {
        if (state === "signIn") {
          return (<SignIn onResult={onResult} />)
        } else if (state === "signedUp") {
          return (<UserInformation onResult={onResult} account={account} />)
        } else if (state === "editProfile") {
          return (<EditProfile onResult={onResult} profile={profile} email={account} />);
        } else if (state === "changePassword") {
          return (<ChangePassword onResult={onResult} email={account} />);
        } else {
          return (<SignUp onResult={onResult} />)
        }
      })()}
    </div>
  );
}

export async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);                    

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string                  
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export default App;
