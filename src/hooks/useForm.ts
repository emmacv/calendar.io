import { useState } from 'react';

const useForm = <T extends Record<string, unknown>>(initialState: T) => {
  const [formValues, setFormValues] = useState(initialState);

  const onChange =
    (field: keyof T, value?: unknown) =>
    (event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: value ?? event?.target.value,
      }));
    };

  //TODO: Add validations with zod
  const onSubmit = (callback: (values: T) => void) => {
    return (event: React.FormEvent) => {
      event.preventDefault();
      callback(formValues);
    };
  };

  return { formValues, onChange, onSubmit };
};

export default useForm;
