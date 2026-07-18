import { useMutation } from '@tanstack/react-query';
import { uploadsService } from '../../API/uploadsService';

export const useUploadImage = () => {
  return useMutation({
    mutationFn: (file: File) => uploadsService.uploadImage(file),
  });
};

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: (publicId: string) => uploadsService.deleteImage(publicId),
  });
};