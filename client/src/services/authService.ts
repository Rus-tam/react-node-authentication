import { AuthResponse } from "../models/responce/AuthResponse";
import {AxiosResponse} from 'axios'
import {$api} from '../http'

export default class AuthService {
  static async login(email: string, password: string):  Promise<AxiosResponse<AuthResponse>> {
    return $api.post('/login', {email, password})
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', {email, password})
  }

  static async logout(): Promise<void> {
    return $api.delete('/logout')
  }
}
