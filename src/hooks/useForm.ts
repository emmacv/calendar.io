import { useState } from 'react';

const useForm = <T extends Record<string, unknown>>() => {
  const [formValues, setFormValues] = useState<T>();

  type FormValuesType = typeof formValues & {};

  const setInitialValues = (values: FormValuesType) => {
    setFormValues(values);
  };

  const onChange =
    (field: keyof FormValuesType, value?: unknown) =>
    (event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!formValues) return;

      setFormValues(
        (prev) =>
          ({
            ...prev,
            [field]: value ?? event?.target.value,
          }) as T
      );
    };

  //TODO: Add validations with zod
  const onSubmit = (callback: (values: FormValuesType) => void) => {
    if (!formValues) return;

    return (event: React.FormEvent) => {
      event.preventDefault();
      callback(formValues);
    };
  };

  return { formValues, onChange, onSubmit, setInitialValues };
};

export default useForm;
