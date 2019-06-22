// tslint:disable: max-line-length
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'

export interface DefinitivelyResponse<S extends number, R> extends AxiosResponse<R> {
  status: S
}

export interface DefinitivelyInstance {
  axios: AxiosInstance
  request<DR extends DefinitivelyResponse<number, R>, R = any>(options: AxiosRequestConfig): Promise<DR>
  get<DR extends DefinitivelyResponse<number, R>, R = any>(url: string, options?: AxiosRequestConfig): Promise<DR>
  post<DR extends DefinitivelyResponse<number, R>, R = any>(url: string, options?: AxiosRequestConfig): Promise<DR>
  put<DR extends DefinitivelyResponse<number, R>, R = any>(url: string, options?: AxiosRequestConfig): Promise<DR>
  patch<DR extends DefinitivelyResponse<number, R>, R = any>(url: string, options?: AxiosRequestConfig): Promise<DR>
  delete<DR extends DefinitivelyResponse<number, R>, R = any>(url: string, options?: AxiosRequestConfig): Promise<DR>
  head<DR extends DefinitivelyResponse<number, R>, R = any>(url: string, options?: AxiosRequestConfig): Promise<DR>
}

export const create = (instance: AxiosInstance): DefinitivelyInstance => ({
  get axios() {
    return instance
  },
  request<DR, R>(options: AxiosRequestConfig) {
    return instance.request<R, DR>(options)
  },
  get<DR, R>(url: string, options?: AxiosRequestConfig) {
    return instance.get<R, DR>(url, options)
  },
  post<DR, R>(url: string, options?: AxiosRequestConfig) {
    return instance.post<R, DR>(url, options)
  },
  put<DR, R>(url: string, options?: AxiosRequestConfig) {
    return instance.put<R, DR>(url, options)
  },
  patch<DR, R>(url: string, options?: AxiosRequestConfig) {
    return instance.patch<R, DR>(url, options)
  },
  delete<DR, R>(url: string, options?: AxiosRequestConfig) {
    return instance.delete<R, DR>(url, options)
  },
  head<DR, R>(url: string, options?: AxiosRequestConfig) {
    return instance.head<R, DR>(url, options)
  },
})

export interface DefinitivelyStatic extends DefinitivelyInstance {
  create: (config?: AxiosRequestConfig) => DefinitivelyInstance
}
const definitivelyStatic: DefinitivelyStatic = {
  ...create(axios),
  create: (config) => create(axios.create(config)),
}
export default definitivelyStatic
