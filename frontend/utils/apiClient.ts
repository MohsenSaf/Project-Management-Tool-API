/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import axios, { AxiosInstance, Method, AxiosRequestConfig } from "axios"
import { USER_TOKEN } from "@/constant/auth"

class ApiRequestBuilder {
  private client: AxiosInstance
  private method: Method
  private url: string

  constructor(client: AxiosInstance, method: Method, url: string) {
    this.client = client
    this.method = method
    this.url = url
  }

  /** Send JSON data */
  async data<T = any>(jsonData?: Record<string, any>) {
    const config: AxiosRequestConfig = {
      method: this.method,
      url: this.url,
      data: jsonData,
      headers: { "Content-Type": "application/json" },
    }
    return this.client.request<T>(config)
  }

  /** Send files */
  async formData<T = any>(
    fields?: Record<string, any>,
    files?: Record<string, File | File[]>
  ) {
    const formData = new FormData()

    if (fields) {
      Object.entries(fields).forEach(([key, value]) =>
        formData.append(key, value as any)
      )
    }

    if (files) {
      Object.entries(files).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file) => formData.append(key, file))
        } else {
          formData.append(key, value)
        }
      })
    }

    const config: AxiosRequestConfig = {
      method: this.method,
      url: this.url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }

    return this.client.request<T>(config)
  }
}

class ApiClient {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.BASE_URL, //Always prepends /api
    })

    // Add Bearer token automatically
    this.axiosInstance.interceptors.request.use((config) => {
      const token = sessionStorage.getItem(USER_TOKEN)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }

  request(method: Method, url: string) {
    return new ApiRequestBuilder(this.axiosInstance, method, url)
  }
}

export const apiClient = new ApiClient()
