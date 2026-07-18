import type { UploadImageResponseDto } from "../Types/Response";
import { axiosClient } from "./Shared";

export const uploadsService = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosClient.post<UploadImageResponseDto>('/uploads/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteImage: async (publicId: string) => {
    await axiosClient.delete('/uploads/image', {
      params: { publicId },
    });
  },
};