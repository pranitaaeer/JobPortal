import { useSession } from '@clerk/react'
import React, { useState } from 'react'

const Usefetch = (cb,options={}) => {
    const [data,setData]=useState(undefined)
    const [loading,setLoading]=useState(null)
    const [errot,setError]=useState(null)

    const {session}=useSession()

    const fn=async (...args) => {
        setLoading(true)
        setError(null)

        try {
            
            const supabaseAccessToken=await session.getToken({
                template:"supabase"
            })

            const response= await cb(supabaseAccessToken,options,...args)
            setData(response)
            setError(null)
        } catch (error) {
            console.log("err:",error);
            setError(error)
        }finally{
            setLoading(false)
        }
    }
 return {fn,data,loading}
}

export default Usefetch