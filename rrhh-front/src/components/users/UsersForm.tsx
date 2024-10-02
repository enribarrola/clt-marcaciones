import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Funcionario } from '../../types/funcionario';
import ValidatedInput from '../Forms/ValidatedInput';
import { validarFechaAnteriorQueHoy } from '../../utils/validators';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../utils/constants';
import { mutate } from 'swr';
import { errorHandler } from '../../utils/handlers';

export default function UsersForm() {
  const form = useForm<Funcionario>();
  
  const onSubmit: SubmitHandler<Funcionario> = async (funcionario) => {
    try {
      await axios.post(`${API_URL}/funcionario`, {
        ...funcionario,
        // convierte la fecha a un formato que acepta la base de datos
        fecha_nacimiento: new Date(funcionario.fecha_nacimiento).toISOString()
      });
      Swal.fire({
        title: 'Exito',
        text: 'El funcionario se agrego correctamente',
        icon: 'success'
      });
      form.reset();

      //refresca la cache de swr
      mutate(`${API_URL}/funcionario`);
    } catch (error: unknown) {
      errorHandler(error);
    }
  };
  return (
    // el form provider es necesario para que los inputs puedan acceder al form
    <FormProvider {...form}>
      <form className='d-flex flex-column col-3' onSubmit={form.handleSubmit(onSubmit)}>
        <ValidatedInput name='nombre'>Nombre</ValidatedInput>
        <ValidatedInput name='apellido'>Apellido</ValidatedInput>
        <ValidatedInput name='documentNumber'> Numero de documento</ValidatedInput>
        <ValidatedInput
          name='fecha_nacimiento'
          inputType='date'
          errorHandler={{
            validate: validarFechaAnteriorQueHoy
          }}
        >
          Fecha de nacimiento
        </ValidatedInput>

        <button type='submit' className='btn btn-primary mt-3'>
          Agregar
        </button>
      </form>
    </FormProvider>
  );
}
