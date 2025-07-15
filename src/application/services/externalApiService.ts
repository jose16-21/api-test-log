import axios, { AxiosError } from 'axios';

export async function callExternalApi(code: string): Promise<any> {
  try {
    const response = await axios.get(`https://httpstat.us/${code}`);
    console.log(`External API call successful with code: ${response.status}`);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      // Re-lanza el error con su status real
      throw {
        status: axiosError.response.status,
        message: axiosError.response.statusText || 'HTTP Error',
        details: axiosError.message
      };
    } else {
      // Fallo de red o desconocido
      throw {
        status: 500,
        message: 'Unexpected error',
        details: axiosError.message
      };
    }
  }
}
