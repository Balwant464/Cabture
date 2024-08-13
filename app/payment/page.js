"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'

function Payment() {
    const searchParam=useSearchParams();
    const amount=searchParam.get('amount');
     
  return (
    <div>Payment</div>
  )
}

export default Payment