import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

export default function First() {
  const params = useParams();
  useEffect(() => {
    // console.log('unn==', useParams())
    console.log('params', params)
  }, [])
  return (
    <div>First=====</div>
  )
}