import { useNavigate, useParams } from 'react-router-dom';
import { Funcionario } from '../../types/funcionario';
import { FormProvider, useForm } from 'react-hook-form';
import useSWR from 'swr';
import fetcher from '../../db/fetcher';
import { API_URL } from '../../utils/constants';
import { useEffect } from 'react';
import ValidatedInput from '../../components/Forms/ValidatedInput';
import { validarFechaAnteriorQueHoy } from '../../utils/validators';
import { errorHandler } from '../../utils/handlers';
import axios from 'axios';

export default function UsersEdit() {
  const { id } = useParams();
  const form = useForm<Funcionario>();
  const { data } = useSWR(`${API_URL}/funcionario/${id}`, fetcher);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        // parsea la fecha para que el input de tipo date pueda mostrarla al formato yyyy-mm-dd
        fecha_nacimiento: new Date(data.fecha_nacimiento).toISOString().split('T')[0]
      });
    }
  }, [data, form]);

  const onSubmit = async (funcionario: Funcionario) => {
    try {
      await axios.put(`${API_URL}/funcionario/${id}`, {
        ...funcionario,
        // convierte la fecha a un formato que acepta la base de datos
        fecha_nacimiento: new Date(funcionario.fecha_nacimiento).toISOString()
      });
      navigate('/users');
    } catch (error: unknown) {
      errorHandler(error);
    }
  };
  return (
    <div className='col'>
      <h2>Editar Usuario</h2>
      <hr />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mb-3'>
            <ValidatedInput name='nombre'>Nombre</ValidatedInput>
            <ValidatedInput name='apellido'>Apellido</ValidatedInput>
            <ValidatedInput name='cedula'> Numero de documento</ValidatedInput>
            <ValidatedInput
              name='fecha_nacimiento'
              inputType='date'
              errorHandler={{
                validate: validarFechaAnteriorQueHoy
              }}
            >
              Fecha de nacimiento
            </ValidatedInput>
          </div>
          <button type='submit' className='btn btn-primary'>
            Guardar
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
