import './App.css';
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import Spinner from './auth/spinner';
import Routes from './routes';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <Spinner />;
  return children
}

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AuthIsLoaded>
          <Routes />
        </AuthIsLoaded>
      </div>
    </ThemeProvider>

  );
}

export default App;
