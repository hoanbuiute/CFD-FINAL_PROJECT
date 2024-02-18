import React, { useEffect, useState } from 'react'

const useQuery = (promise, dependensies =[]) => {

    const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  const fetch = async (query)=>{
    setLoading(true)
    try {
      const res = await promise(query);
      if(res?.data){
        setData(res.data);
      }
    } catch (error) {
      console.log("error",error);
      setError(error)
    }finally {
      setLoading(false);
    }
  }
  
  console.log("res",data);
  useEffect(() => {
    // console.log('1', 1)
    fetch();
  }, dependensies)   //dependensies chạy rỗng chạy 1 lần

  return {
    data,
    error,
    loading,
    refetch : fetch,
  }
    
}

export default useQuery;