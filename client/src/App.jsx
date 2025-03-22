import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import { UserProvider } from './context/UserContext';
import AppRouter from './AppRouter';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <JobProvider>
          <AppRouter />
        </JobProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;