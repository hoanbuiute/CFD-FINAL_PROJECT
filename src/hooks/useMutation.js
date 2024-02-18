import React, { useState } from 'react'

const useMutation = (promise) => {


    const [data, setData] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

        // setLoading(true);

        const execute = async (payload, options) => {
            const {onSuccess, onFail} = options || {}
            setLoading(true);
            try {
              const res = await promise(payload);
              setData(res?.data || []);
              onSuccess?.(res?.data);
            } catch (error) {
              setError(error);
              onFail?.(error);
            } finally {
              setLoading(false);
            }
          };

    
  return (
    {
        execute,
        data,
        error,
        loading,
        // refetch : fetch,
    }
  )
}

export default useMutation;