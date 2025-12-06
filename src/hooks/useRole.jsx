import { useQuery } from '@tanstack/react-query'
import React, { use } from 'react'
import UseAuth from './UseAuth'
import useAxiosSicure from './useAxiosSicure'

export default function UseRole() {
    const {user} = UseAuth()
    const axiosSecure = useAxiosSicure();
    const {isLoading: roleLoading, data : role = 'user' } = useQuery({
        queryKey: ['user-role', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`)

            return res.data?.role || 'user';
        }
    })
  return {roleLoading, role}
}
