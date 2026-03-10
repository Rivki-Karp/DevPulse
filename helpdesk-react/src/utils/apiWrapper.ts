import type { AxiosResponse } from 'axios';
import axiosInstance from '../service/axiosInstance';
import { showWarningAlert } from '../components/styleComponnents/myAlert';

interface ApiOptions {
  errorTitle?: string;
  errorMessage?: string;
  suppressError?: boolean;
}

/**
 * Wrapper for GET requests with standardized error handling
 */
export async function apiGet<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T | null> {
  const {
    errorTitle = 'Error fetching data',
    errorMessage = 'Please try again later or contact support.',
    suppressError = false
  } = options;

  try {
    const response: AxiosResponse<T> = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`API GET Error (${endpoint}):`, error);
    if (!suppressError) {
      showWarningAlert(errorTitle, errorMessage);
    }
    return null;
  }
}

/**
 * Wrapper for POST requests with standardized error handling
 */
export async function apiPost<T, D = unknown>(
  endpoint: string,
  data: D,
  options: ApiOptions = {}
): Promise<{ status: number; data?: T } | null> {
  const {
    errorTitle = 'Error posting data',
    errorMessage = 'Please try again later or contact support.',
    suppressError = false
  } = options;

  try {
    const response: AxiosResponse<T> = await axiosInstance.post(endpoint, data);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error(`API POST Error (${endpoint}):`, error);
    if (!suppressError) {
      showWarningAlert(errorTitle, errorMessage);
    }
    return null;
  }
}

/**
 * Wrapper for PATCH requests with standardized error handling
 */
export async function apiPatch<T, D = unknown>(
  endpoint: string,
  data: D,
  options: ApiOptions = {}
): Promise<{ status: number; data?: T } | null> {
  const {
    errorTitle = 'Error updating data',
    errorMessage = 'Please try again later or contact support.',
    suppressError = false
  } = options;

  try {
    const response: AxiosResponse<T> = await axiosInstance.patch(endpoint, data);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error(`API PATCH Error (${endpoint}):`, error);
    if (!suppressError) {
      showWarningAlert(errorTitle, errorMessage);
    }
    return null;
  }
}

/**
 * Wrapper for DELETE requests with standardized error handling
 */
export async function apiDelete<T = unknown>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<{ status: number; data?: T } | null> {
  const {
    errorTitle = 'Error deleting data',
    errorMessage = 'Please try again later or contact support.',
    suppressError = false
  } = options;

  try {
    const response: AxiosResponse<T> = await axiosInstance.delete(endpoint);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error(`API DELETE Error (${endpoint}):`, error);
    if (!suppressError) {
      showWarningAlert(errorTitle, errorMessage);
    }
    return null;
  }
}
