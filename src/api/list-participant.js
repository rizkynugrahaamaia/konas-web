import { useMutation, useQuery } from '@tanstack/react-query';
import ENDPOINT from '../constants/endpoint';
import {  uninterceptedAxiosInstance } from '../configs/axios-config';

export const getParticipantList = async (params) => {
  return await uninterceptedAxiosInstance.get(ENDPOINT.getListPeserta, { params });
};

export const getRegionList = async (params) => {
  return await uninterceptedAxiosInstance.get(ENDPOINT.getRegion, { params });
};

export const getStatusList = async (params) => {
  return await uninterceptedAxiosInstance.get(ENDPOINT.getStatusPeserta, { params });
};

export const createPeserta = async (payload) => {
  return await uninterceptedAxiosInstance.post(ENDPOINT.createUser, payload, {});
};

export const updatePeserta = async (payload) => {
  return await uninterceptedAxiosInstance.put(ENDPOINT.updateUser, payload, {});
};

export const deletePeserta = async (id) => {
  return await uninterceptedAxiosInstance.delete(ENDPOINT.deleteUser(id));
};

export const getDetailUserById = async (id, params) => {
  return await uninterceptedAxiosInstance.get(ENDPOINT.getDetailUser(id), { params });
};

export const getUserLogin = async (params) => {
  return await uninterceptedAxiosInstance.get(ENDPOINT.getByuserLogin, { params });
};


export async function downloadPrintPeserta(params, { onSuccess, onError } = {}) {
  try {
    let res = null;
    res = await getParticipantList(params);
    if (res.code === 200) {
      onSuccess(res);
    }
  } catch (error) {
    onError(error);
  }
}

export const useGetParticipantList = (params, options) => {
  const result = useQuery({
    queryKey: ['get-participant-list', params],
    queryFn: () => getParticipantList(params),
    ...options,
  });
  return {
    ...result,
    ...result?.data,
    data: result?.data?.data,
  };
};

export const useGetRegion = (params, options) => {
  const result = useQuery({
    queryKey: ['get-region-list', params],
    queryFn: () => getRegionList(params),
    ...options,
  });
  const finalData = result?.data?.data.map(item => ({
    label: item.fullname,
    value: item.regionId
  }))

  finalData?.unshift({ label: 'Semua', value: '' });

  return {
    ...result,
    ...result?.data,
    data: finalData
  };
};

export const useGetStatus = (params, options) => {
  const result = useQuery({
    queryKey: ['get-status-list', params],
    queryFn: () => getStatusList(params),
    ...options,
  });
  const finalData = result?.data?.data.map(item => ({
    label: item.name,
    value: item.roleId
  }))
  finalData?.unshift({ label: 'Semua', value: '' });
  return {
    ...result,
    ...result?.data,
    data: finalData || []
  };
};

export const useCreatePeserta = () => {
  const result = useMutation({
    mutationFn: (payload) => createPeserta(payload),
  });

  return {
    ...result,
    ...result.data,
    data: result?.data?.data,
  };
};

export const useUpdatePeserta = () => {
  const result = useMutation({
    mutationFn: (payload) => updatePeserta(payload),
  });

  return {
    ...result,
    ...result.data,
    data: result.data?.data,
  };
};

export const useDeletePeserta = () => {
  const result = useMutation({
    mutationFn: (id) => deletePeserta(id),
  });

  return {
    ...result,
    ...result.data,
    data: result.data?.data,
  };
};


export const useGetDetail = (id, params, options) => {
  const result = useQuery({
    queryKey: ['get-participant-detail', id, params],
    queryFn: () => getDetailUserById(id, params),
    ...options,
  });
  return {
    ...result,
    ...result?.data,
    data: result?.data?.data,
  };
};

export const useLoginUser = (params, options) => {
  const result = useQuery({
    queryKey: ['get-login-user', params],
    queryFn: () => getUserLogin(params),
    ...options,
  });
  return {
    ...result,
    ...result?.data,
    data: result.data?.data,
  };
};