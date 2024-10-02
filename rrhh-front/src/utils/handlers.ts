import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

export function errorHandler(error: unknown) {
  let message = '';
  if (error instanceof AxiosError) {
    message = error.response?.data.message || error.message || 'Ocurrio un error';
  } else {
    message = 'Ocurrio un error';
  }

  Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error'
  });
}
