import { useMutation } from '@tanstack/react-query';
import ENDPOINT from '../constants/endpoint';
import {  uninterceptedAxiosInstance } from '../configs/axios-config';

export const scanKehadiran = async (id) => {
    return await uninterceptedAxiosInstance.post(ENDPOINT.updateKehadiran(id));
  };
  
export const useScanKehadiran = () => {
    const result = useMutation({
      mutationFn: (id) => scanKehadiran(id),
    });
    return {
      ...result,
      ...result.data,
      data: result?.data?.data,
    };
  };
  