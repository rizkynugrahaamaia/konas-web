import { useMutation, useQuery } from '@tanstack/react-query';
import { interceptedAxiosInstance } from "../configs/axios-config";
import ENDPOINT from "../constants/endpoint";

export const getCandidatesList = async (params) => {
  return await interceptedAxiosInstance.get(ENDPOINT.getCandidates, { params });      
}

export const createCandidate = async (payload) => {
  return await interceptedAxiosInstance.post(ENDPOINT.candidateApi, payload, {});
};

export const deleteCandidate = async () => {
return await interceptedAxiosInstance.delete(ENDPOINT.candidateApi);
};

export const getVoteList = async (params) => {
    return await interceptedAxiosInstance.get(ENDPOINT.getVote, { params });      
}

export const getVoteByUser = async (params) => {
  return await interceptedAxiosInstance.get(ENDPOINT.getVoteByUser, { params });      
}

export const createVote = async (id) => {
  return await interceptedAxiosInstance.post(ENDPOINT.createVote(id));
};

export const deleteVote = async () => {
  return await interceptedAxiosInstance.delete(ENDPOINT.getVote);
};

export const useGetCandidate = (params, options) => {
  const result = useQuery({
      queryKey: ['get-candidates-list', params],
      queryFn: () => getCandidatesList(params),
      ...options
  });
  return result;
}

export const useCreateCandidate = () => {
  const result = useMutation({
    mutationFn: (payload) => createCandidate(payload),
  });

  return {
    ...result,
    ...result.data,
    data: result?.data?.data,
  };
};

export const useDeleteCandidate = () => {
  const result = useMutation({
    mutationFn: () => deleteCandidate(),
  });

  return {
    ...result,
    ...result.data,
    data: result.data?.data,
  };
};

export const useGetVoteList = (params, options) => {
    const result = useQuery({
        queryKey: ['get-vote-list', params],
        queryFn: () => getVoteList(params),
        ...options
    });
    return result;
}

export const useGetVoteByUser = (params, options) => {
  const result = useQuery({
    queryKey: ['get-vote-by-user', params],
    queryFn: () => getVoteByUser(params),
    ...options
});
  return result;
}

export const useCreateVote = () => {
  const result = useMutation({
    mutationFn: (id) => createVote(id),
  });

  return {
    ...result,
    ...result.data,
    data: result?.data?.data,
  };
};
  
export const useDeleteVote = () => {
  const result = useMutation({
    mutationFn: () => deleteVote(),
  });

  return {
    ...result,
    ...result.data,
    data: result.data?.data,
  };
};