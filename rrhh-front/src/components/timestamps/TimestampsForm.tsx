import { FormProvider, useForm } from 'react-hook-form';
import useSWR, {mutate} from 'swr';
import { Funcionario } from '../../types/funcionario';
import { API_URL } from '../../utils/constants';
import fetcher from '../../db/fetcher';
import ValidatedInput from '../Forms/ValidatedInput';
import { validarFechaAnteriorQueHoy } from '../../utils/validators';
import { MarcacionPost } from '../../types/marcacion';
import axios from 'axios';
import { errorHandler } from '../../utils/handlers';
import Swal from 'sweetalert2';

export default function TimestampsForm() {
  const { data } = useSWR<Funcionario[]>(`${API_URL}/funcionario`, fetcher);
  const form = useForm<MarcacionPost>();

  const onSubmit = async (marcacion: MarcacionPost) => {
    if (marcacion.hora_entrada >= marcacion.hora_salida) {
      form.setError('hora_entrada', {
        type: 'manual',
        message: 'La hora de entrada debe ser menor a la de salida'
      });
      return;
    }
    try {
      await axios.post(`${API_URL}/marcacion`, {
        ...marcacion,
        fecha: new Date(marcacion.fecha).toISOString()
      });

      form.reset();
	  
	  //actualiza el cache de swr para la tabla de marcaciones
	  mutate(`${API_URL}/marcacion`);

      Swal.fire({
        title: 'Marcación registrada',
        icon: 'success'
      });
    } catch (error) {
      errorHandler(error);
    }
  };
  return (
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
          {data?.map((worker) => (
            <option key={worker.id_funcionario} value={worker.id_funcionario}>
              {worker.nombre} {worker.apellido} - {worker.id_funcionario}
            </option>
          ))}
        </select>
        {form.formState.errors.id_funcionario && (
          <span className='text-danger'>{form.formState.errors.id_funcionario.message as string}</span>
        )}
        <ValidatedInput name='fecha' inputType='date' errorHandler={{ validate: validarFechaAnteriorQueHoy }}>
          Fecha
        </ValidatedInput>
        {/* TODO - validar que la fecha de entrada sea menor a la de salida siempre */}
        <ValidatedInput name='hora_entrada' inputType='time'>
          Hora de entrada
        </ValidatedInput>
        <ValidatedInput name='hora_salida' inputType='time'>
          Hora de Salida
        </ValidatedInput>

        <button type='submit' className='btn btn-primary mt-3'>
          Registrar
        </button>
      </form>
    </FormProvider>
  );
}
