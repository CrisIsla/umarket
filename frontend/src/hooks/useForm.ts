import { useState } from "react";

interface UseFormReturn<T> {
  formState: T;
  onInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onResetForm: () => void;
}

export function useForm<T extends Record<string, unknown>>(
  initialForm: T
): UseFormReturn<T> {
  const [formState, setFormState] = useState<T>(initialForm);

  const onInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onResetForm = () => setFormState(initialForm);

  return {
    formState,
    onInputChange,
    onResetForm,
  };
}
