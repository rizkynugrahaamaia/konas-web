import ENDPOINT from '../constants/endpoint';
import { useMutation } from '@tanstack/react-query';
import { clearStorage } from '../utils/storage';
import { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } from '../constants/auth';

import { interceptedAxiosInstance, uninterceptedAxiosInstance } from '../configs/axios-config';

export const login = async (params) => {
  const response = await uninterceptedAxiosInstance.post(
    ENDPOINT.signin,
    params,
    { auth: { username:  BASIC_AUTH_USERNAME, password: BASIC_AUTH_PASSWORD }}
  );
  return response;
};

export function useLogin() {
  return useMutation({
    mutationFn: (params) => {
      return login(params);
    },
  });
}

export const logout = async () => {
  const response = await interceptedAxiosInstance.post(
    ENDPOINT.signout
  );
  return response;
};

export function useLogout() {
  return useMutation({
    mutationFn: () => {
      return logout();
    },
    onSuccess: () => {
      clearStorage();
      window.location.href = window.location.origin + '/login';
    },
  });
}
