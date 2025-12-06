import axios from 'axios'
import React from 'react'

const axiosSicure = axios.create({
    baseURL: 'https://zap-shift-server-side-mauve.vercel.app'
})

export default function useAxiosSicure() {

  return axiosSicure;
}
