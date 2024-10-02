import React from 'react';
import { Path, FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

interface ValidatedInputProps<T extends FieldValues> {
  children: React.ReactNode;
  name: Path<T>;
  errorHandler?: RegisterOptions<T, Path<T>>;
  inputType?: React.HTMLInputTypeAttribute;
}

function ValidatedInput<T extends FieldValues>({
  children,
  name,
  errorHandler = {},
  inputType = 'text'
}: ValidatedInputProps<T>) {
  const {
    register,
    formState: { errors }
  } = useFormContext<T>();

  return (
    <>
      {children}
      <input
        type={inputType}
        id={name}
        className='form-control'
        {...register(name, {
          required: {
            value: true,
            message: `El ${children} es requerido`
          },
          ...errorHandler
        })}
      />
      {errors[name] && <span className='text-danger'>{errors[name]?.message as string}</span>}
    </>
  );
}

export default ValidatedInput;
