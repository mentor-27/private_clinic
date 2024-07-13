import { Route, Routes } from 'react-router-dom';
import { AppList, Auth, Main } from './pages';
import { Content, Header } from './components';
import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

export const App = () => {
  return (
    <>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/applist" element={<AppList />} />
        </Routes>
      </Content>
    </>
  );
};
