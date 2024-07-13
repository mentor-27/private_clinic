import { useEffect, useRef, useState } from 'react';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { SERVER_URL } from '../../consts';
import { FilterMatchMode, PrimeIcons } from 'primereact/api';
import { InputText } from 'primereact/inputtext';

export const AppList = () => {
  const [gFilter, setGFilter] = useState('');
  const [patients, setPatients] = useState([
    {
      date: undefined,
      fullname: <Skeleton />,
      phone: <Skeleton />,
      issue: <Skeleton />,
    },
  ]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const toast = useRef(null);

  const showError = error => {
    toast.current.show({
      severity: 'error',
      summary: 'Ошибка',
      detail: error || 'Не удалось загрузить список',
      life: 3000,
    });
  };

  useEffect(() => {
    fetch(`${SERVER_URL}/applist`, {
      credentials: 'include',
    })
      .then(resp => {
        if (!resp.ok) {
          showError();
          return;
        }
        return resp.json();
      })
      .then(data => {
        if (data.error) {
          showError(data.error);
          return;
        }
        setPatients(data);
      })
      .catch(e => showError(e.message));
  }, []);

  const dateTransform = patient => {
    return new Date(patient.date).toLocaleString() === 'Invalid Date' ? (
      <Skeleton />
    ) : (
      new Date(patient.date).toLocaleString()
    );
  };

  const phoneTransform = patient => (
    <a href={`tel:${patient.phone}`} className="no-underline text-primary-500">
      {patient.phone}
    </a>
  );

  const onGFilterChange = ({ target }) => {
    const { value } = target;
    const _filters = { ...filters };
    _filters.global.value = value;
    setFilters(_filters);
    setGFilter(target.value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputIcon className={PrimeIcons.SEARCH}></InputIcon>
          <InputText placeholder="Поиск" value={gFilter} onChange={onGFilterChange} />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <Panel
        header={<h2 className="m-0">Заявки с формы</h2>}
        className="flex flex-column"
        style={{ width: '75%' }}
        pt={{
          header: () => ({
            style: {
              display: 'flex',
              justifyContent: 'center',
            },
          }),
        }}
      >
        <DataTable
          value={patients}
          stripedRows
          removableSort
          paginator
          rows={5}
          filters={filters}
          header={header}
          emptyMessage="Записей не найдено"
        >
          <Column
            className="w-3"
            field="date"
            header="Дата отправки"
            sortable
            body={dateTransform}
          ></Column>
          <Column className="w-3" field="fullname" header="ФИО" sortable></Column>
          <Column className="w-2" field="phone" header="Телефон" body={phoneTransform}></Column>
          <Column className="w-3" field="issue" header="Проблема" sortable></Column>
        </DataTable>
      </Panel>
    </>
  );
};
