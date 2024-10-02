export interface Marcacion {
  nombre_completo: string;
  fecha: string;
  hora_entrada: string;
  hora_salida: string;
  horas_trabajadas: string;
}

export interface MarcacionPost {
  id_funcionario: number;
  fecha: string;
  hora_entrada: string;
  hora_salida: string;
}
export interface MarcacionSearch {
  id_funcionario: string;
  fecha_desde: string;
  fecha_hasta: string;
}

export interface MarcacionResponse {
	nombre_completo: string;
	fecha: string;
	hora_entrada: string;
	hora_salida: string;
}
