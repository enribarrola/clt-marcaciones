import useSWR from 'swr';
import ReportsTable from '../../components/reports/ReportsTable';
import fetcher from '../../db/fetcher';
import { API_URL } from '../../utils/constants';
import { FormProvider, useForm } from 'react-hook-form';
import ValidatedInput from '../../components/Forms/ValidatedInput';
import { Marcacion, MarcacionSearch } from '../../types/marcacion';
import { validarFechaAnteriorQueHoy } from '../../utils/validators';
import { Funcionario } from '../../types/funcionario';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function ReportsView() {
  const form = useForm<MarcacionSearch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: funcionarios } = useSWR<Funcionario[]>(`${API_URL}/funcionario`, fetcher);
  const { data: marcaciones } = useSWR<Marcacion[]>(
    searchParams.size > 0 ? `${API_URL}/marcacion/report?${searchParams.toString()}` : null,
    fetcher
  );

  const onSubmit = (data: MarcacionSearch) => {
    if (data.fecha_desde > data.fecha_hasta) {
      form.setError('fecha_desde', { type: 'manual', message: 'La fecha desde no puede ser mayor a la fecha hasta' });
      return;
    }
    const searchParams = new URLSearchParams(Object.entries(data).map(([key, value]) => [key, String(value)]));
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (searchParams.size === 0) return;
    const search = Object.fromEntries(searchParams.entries());
    form.setValue('id_funcionario', search.id_funcionario);
    form.setValue('fecha_desde', search.fecha_desde);
    form.setValue('fecha_hasta', search.fecha_hasta);
  }, [searchParams, form]);
  return (
    <div>
      <h2>Reporte de Marcaciones</h2>
      <hr />

      <div className='row'>
        <FormProvider {...form}>
          <form className='d-flex flex-column col-3' onSubmit={form.handleSubmit(onSubmit)}>
            <label htmlFor='worker'>Trabajador</label>
            <select
              id='worker'
              className='form-control'
              defaultValue=''
              {...form.register('id_funcionario', {
                required: 'Es necesario seleccionar un trabajador'
              })}
            >
              <option value='' disabled>
                Seleccione un trabajador
              </option>
              {funcionarios?.map((worker) => (
                <option key={worker.id_funcionario} value={worker.id_funcionario}>
                  {worker.nombre} {worker.apellido} - {worker.id_funcionario}
                </option>
              ))}
            </select>
            {form.formState.errors.id_funcionario && (
              <span className='text-danger'>{form.formState.errors.id_funcionario.message as string}</span>
            )}
            <ValidatedInput name='fecha_desde' inputType='date'>
              Desde
            </ValidatedInput>
            <ValidatedInput name='fecha_hasta' inputType='date' errorHandler={{ validate: validarFechaAnteriorQueHoy }}>
              Hasta
            </ValidatedInput>

            <button type='submit' className='btn btn-primary mt-3'>
              Buscar
            </button>
          </form>
        </FormProvider>

        <div className='col'>
          <ReportsTable marcaciones={marcaciones || []} />
        </div>
      </div>
    </div>
  );
}
