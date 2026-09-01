import supabaseClient from "@/utils/supabase";


export async function getComapnies(token) {
 const supabase=await supabaseClient(token)

 const query=supabase.from("companies").select("*")

 const {data,error}=await query

 if(error){
    return null
 }
 return data
}

