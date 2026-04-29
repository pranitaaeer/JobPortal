import supabaseClient from "@/utils/supabase";

export async function getApplications(token,userId) {
    const supabase=await supabaseClient(token)
    const query=supabase.from("applications").select("*")
    const {data,error}=await query

    if(error){
        console.log("error",error);
        return {applicationError:error,success:false}
    }
        return {applicationData:data,success:true}
    
}

export async function CreateApplication(token,userId,formData,jobId) {
    const supabase=await supabaseClient(token)

    const {data:applicationData,error:applicationError}=supabase.from("applications")
                        .insert({
                            job_id:jobId,
                            candidate_id:userId,
                            name:formData.name,
                            status:formData.status,
                            resume:formData.resume,
                            skils:formData.skils,
                            experiance:formData.experiance,
                            education:formData.education
                        })
                        .select()
                        .single()


    if(applicationData){
        console.log("error",applicationError);
        return {error:applicationError,success:false}
    }
        return {error:applicationData,success:true}

}
export async function DeleteApplication(token,userId,applicationId,jobId) {
    const supabase=await supabaseClient(token)

    const {data:deleteddata,error:applicationError}=supabase.from("applications")
                       .delete()
                       .match({
                            candidate_id: userId,
                            job_id: jobId,
                            id: applicationId
                            })
                       .select()


    if(deleteddata){
        console.log("error",applicationError);
        return {error:applicationError,success:false}
    }
        return {error:deleteddata,success:true}

}