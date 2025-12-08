import axios from 'axios'
import React from 'react'

const axiosSicure = axios.create({
    baseURL: 'http://localhost:3000/'
})

export default function useAxiosSicure() {
  return axiosSicure;
}
