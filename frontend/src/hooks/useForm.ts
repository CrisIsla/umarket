import { useState } from "react";

interface UseFormReturn<T> {
  formState: T;
  onInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onResetForm: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageCount: number;
  onRemoveImage: (index: number) => void;
}

export function useForm<T extends Record<string, unknown>>(
  initialForm: T
): UseFormReturn<T> {
  const [formState, setFormState] = useState<T>(initialForm);
  const [imageCount, setImageCount] = useState(0);

  const onInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (imageCount + files.length <= 5) {
        const currentImages = (formState as any).images || [];
        const updatedImages = [...currentImages, ...files];

        setFormState({
          ...formState,
          images: updatedImages,
        });
        setImageCount(updatedImages.length);
      }
    }
  };

  const onRemoveImage = (index: number) => {
    if (formState.images && Array.isArray(formState.images)) {
      const images = [...formState.images];
      images.splice(index, 1);
      setFormState({
        ...formState,
        images,
      });
      setImageCount(images.length);
    }
  };

  const onResetForm = () => {
    setFormState(initialForm);
    setImageCount(0);
  };

  return {
    formState,
    onInputChange,
    onResetForm,
    onImageChange,
    onRemoveImage,
    imageCount,
  };
}
