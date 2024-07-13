import { useRef } from 'react';
import { SERVER_URL } from '../../consts';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { localStorageService } from '../../services/localStorageService';

import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

export const Auth = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const navigate = useNavigate();

  const showError = message => {
    toast.current.show({
      severity: 'error',
      summary: 'Ошибка',
      detail: message,
      life: 3000,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        login: formData.get('login'),
        password: formData.get('password'),
      }),
    })
      .then(resp => resp.json())
      .then(({ data }) => {
        if (data?.error) {
          showError(data.error);
          return;
        }
        dispatch(setToken(data.id));
        localStorageService.storeData(data.id);
        navigate('/applist');
      })
      .catch(console.error);
  };

  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <Panel
        header={<h2 className="m-0">Вход</h2>}
        className="flex flex-column w-20rem"
        pt={{
          header: () => ({
            style: {
              display: 'flex',
              justifyContent: 'center',
            },
          }),
        }}
      >
        <form className="flex flex-column align-items-center" onSubmit={onSubmit}>
          <div className="mt-3 mb-5 w-full">
            <FloatLabel>
              <InputText className="w-full" type="text" id="login" name="login" required />
              <label className="font-bold" htmlFor="login">
                Логин
              </label>
            </FloatLabel>
          </div>
          <div className="mb-3 w-full">
            <FloatLabel>
              <Password
                className="w-full"
                id="password"
                feedback={false}
                name="password"
                required
                pt={{
                  input: () => ({
                    style: {
                      width: '100%',
                    },
                  }),
                }}
              />
              <label className="font-bold" htmlFor="password">
                Пароль
              </label>
            </FloatLabel>
          </div>
          <Button type="submit" label="Войти" icon={PrimeIcons.SIGN_IN}></Button>
        </form>
      </Panel>
    </>
  );
};
