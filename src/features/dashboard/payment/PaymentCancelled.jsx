import React from 'react'
import { Link } from 'react-router'

export default function PaymentCancelled() {
  return (
    <div>
        <h2 className="text-4xl">Payment Cancelled !!!</h2>
        <Link to="/dashboard/student/applied-tutors" className='btn btn-primary text-white'>Plz Try Again</Link>
    </div>
  )
}
