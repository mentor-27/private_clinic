import { PrimeIcons } from 'primereact/api';
import { Menubar } from 'primereact/menubar';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../../redux/actions';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const items = [
    {
      label: 'Главная',
      icon: PrimeIcons.HOME,
      command: () => navigate('/'),
    },
    {
      label: 'Заявки',
      icon: PrimeIcons.LIST,
      command: () => navigate('/applist'),
      visible: isAuthenticated,
    },
    {
      label: isAuthenticated ? 'Выход' : 'Вход',
      icon: isAuthenticated ? PrimeIcons.SIGN_OUT : PrimeIcons.SIGN_IN,
      command: () => {
        if (isAuthenticated) {
          dispatch(logoutAsync);
          navigate('/');
        } else navigate('/login');
      },
    },
  ];

  const start = (
    <Link to="/" className="no-underline text-xl font-semibold text-primary">
      Great Health
    </Link>
  );

  return (
    <Menubar
      className="flex justify-content-between mb-5 px-4 "
      model={items}
      start={start}
      pt={{
        icon: {
          style: {
            color: 'var(--primary-color)',
          },
        },
      }}
    ></Menubar>
  );
};
