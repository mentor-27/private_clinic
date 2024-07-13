import { useRef, useState } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Panel } from 'primereact/panel';
import { SERVER_URL } from '../../consts';
import { Toast } from 'primereact/toast';

export const Main = () => {
  const toast = useRef(null);
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [issue, setIssue] = useState('');

  const onFullnameChange = ({ target }) => {
    setFullname(target.value);
  };

  const onPhoneChange = ({ target }) => {
    setPhone(target.value);
  };

  const onIssueChange = ({ target }) => {
    setIssue(target.value);
  };

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Готово',
      detail: 'Вы успешно записаны в очередь',
      life: 3000,
    });
  };

  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Что-то пошло не так, попробуйте позже',
      life: 3000,
    });
  };

  const showConnectionError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Что-то пошло не так, вероятно Вы не заполнили обязательные поля',
      life: 3000,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      date: new Date(),
      fullname,
      phone,
      issue,
    };
    fetch(SERVER_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then(resp => {
        if (resp.ok) {
          showSuccess();
          setFullname('');
          setPhone('');
          setIssue('');
        } else {
          showError();
        }
      })
      .catch(error => {
        showConnectionError();
      });
  };

  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <Panel
        header={<h2 className="m-0">Запись к врачу</h2>}
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
              <InputText
                className="w-full"
                type="text"
                id="fullname"
                name="fullname"
                onChange={onFullnameChange}
                value={fullname}
                required
              />
              <label className="font-bold" htmlFor="fullname">
                ФИО
              </label>
            </FloatLabel>
          </div>
          <div className="mb-5 w-full">
            <FloatLabel>
              <InputMask
                className="w-full"
                type="text"
                mask="+7 999 999 9999"
                id="phone"
                name="phone"
                onChange={onPhoneChange}
                value={phone}
                required
              />
              <label className="font-bold" htmlFor="phone">
                Номер телефона
              </label>
            </FloatLabel>
          </div>
          <div className="mb-3 w-full">
            <FloatLabel>
              <InputTextarea
                className="w-full"
                name="issue"
                onChange={onIssueChange}
                value={issue}
              />
              <label className="font-bold" htmlFor="issue">
                Опишите Вашу проблему
              </label>
            </FloatLabel>
          </div>
          <Button type="submit" label="Записаться" icon={PrimeIcons.CLOCK}></Button>
        </form>
      </Panel>
    </>
  );
};
