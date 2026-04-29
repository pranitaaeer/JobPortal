import supabaseClient ,{supabaseUrl} from "@/utils/supabase";

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
 export async function getaplicationForJob(token,jobId) {
    const supabase=await supabaseClient(token)

    const query=supabase.from("applications").select("*").eq("job_id",jobId)
    const {data,error}=await query

    if(error){
        console.log("error",error);
        return error
    }
    return data
}

export async function CreateApplication(token, userId, formData, jobId) {
    try {
        const supabase = await supabaseClient(token)
        
        // Validation
        if (!formData.resume) {
            return { 
                error: { message: "Resume file is required" }, 
                success: false 
            }
        }
        
        // Generate unique filename with original extension
        const timestamp = Date.now()
        const random = Math.floor(Math.random() * 90000)
        const fileExtension = formData.resume.name?.split('.').pop() || 'pdf'
        const fileName = `resume-${userId}-${timestamp}-${random}.${fileExtension}`

        // Upload resume to storage
        const { error: storageError } = await supabase.storage
            .from("resumes")
            .upload(fileName, formData.resume, {
                cacheControl: '3600',
                upsert: false
            })

        if (storageError) {
            console.error("Storage error:", storageError)
            return { 
                error: { message: "Error uploading resume", details: storageError }, 
                success: false 
            }
        }

        // Get public URL
        const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`

        // Prepare application data
        const applicationData = {
            job_id: jobId,
            candidate_id: userId,
            name: formData.name || '',
            status: formData.status || "pending",
            resume: resume,
            skills: formData.skills || null,
            experience: formData.experience || null,
            education: formData.education || null,
            created_at: new Date().toISOString()
        }

        // Create application record
        const { data: result, error: applicationError } = await supabase
            .from("applications")
            .insert(applicationData)
            .select()
            .single()

        if (applicationError) {
            console.error("Application error:", applicationError)
            return { error: applicationError, success: false }
        }

        console.log("Application created successfully:", result)
        return { data: result, success: true }
        
    } catch (error) {
        console.error("Unexpected error:", error)
        return { error: { message: error.message }, success: false }
    }
}

export async function Updatepplication(token,jobId,status) {
    const supabase=await supabaseClient(token)

    const query=supabase.from("applications").update({status}).eq("job_id",jobId).select().single()
    const {data,error}=await query

    if(error){
        console.log("error",error);
        return error
    }
    return data
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