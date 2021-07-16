import './App.css';
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import Spinner from './auth/spinner';
import Routes from './routes';

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <Spinner />;
  return children
}

function App() {
  return (
    <div className="App">
      <AuthIsLoaded>
        <Routes />
      </AuthIsLoaded>
    </div>
  );
}

export default App;
