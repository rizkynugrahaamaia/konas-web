import { useQuery } from '@tanstack/react-query';
import fetch, { service } from '../utils/fetch';

export const getetParticipantList = () => {
  return fetch.get(service + '/participant-list', { withCredentials: true });
};

export const useGetParticipantList = (params, options) => {
  const result = useQuery({
    queryKey: ['get-participant-list', params],
    queryFn: () => getetParticipantList(),
    ...options,
  });
  return {
    ...result,
    ...result?.data,
    data: result?.data?.data,
  };
};