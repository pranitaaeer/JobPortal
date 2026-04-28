import supabaseClient from "@/utils/supabase";


export async function getComapnies(token) {
 const supabase=await supabaseClient(token)
 console.log(supabase);    

 const query=supabase.from("companies").select("*")

 const {data,error}=await query

 if(error){
    console.log(error);
    return null
 }
 return data
}

