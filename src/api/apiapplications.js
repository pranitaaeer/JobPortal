import supabaseClient ,{supabaseUrl} from "@/utils/supabase";

export async function getMyApplications(token, { userId }) {
    const supabase = await supabaseClient(token)
    
    const { data, error } = await supabase
        .from("applications")
        .select(`
            *,
            jobs:job_id (
                created_at,
                job_type,
                company:comapny_id (
                    name,
                    logo_url
                )
            )
        `)
        .eq("candidate_id", userId)

    if (error) {
        console.log("error", error);
        return null
    }
    
    return data
}
 export async function getaplicationForJob(token,options) {
    const supabase=await supabaseClient(token)
    const {jobId}=options
    const query=supabase.from("applications").select(`* , jobs:job_id ( title,job_type,company:comapny_id( name,logo_url))`).eq("job_id",jobId)
    const {data,error}=await query

    if(error){
        console.log("error",error.message);
        return error
    }
    return data
}

export async function CreateApplication(token, options) {
    try {
        const supabase = await supabaseClient(token)
        
        // Destructure options
        const { userId, jobId ,formData} = options
        
        // Validation
        if (!formData.resume) {
            return { 
                error: { message: "Resume file is required" }, 
                success: false 
            }
        }
        
        // Generate unique filename
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
        const resumeUrl = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`

        // Prepare application data
        const applicationData = {
            job_id: jobId,
            candidate_id: userId,
            name: formData.name || '',
            status: "interviewing",
            resume: resumeUrl,
            skills: formData.skills || null,
            experiance: formData.experience || null,
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
export async function DeleteApplication(token, options) {
    try {
        const { userId, applicationId } = options
        console.log("options,",options);
        const supabase = await supabaseClient(token)

        const { data: deletedData, error: applicationError } = await supabase
            .from("applications")
            .delete()
            .eq("candidate_id", userId)
            .eq("id", applicationId)
            .select()

        // ✅ Check for error first
        if (applicationError) {
            console.error("Delete error:", applicationError)
            return { error: applicationError, success: false }
        }

        // ✅ Check if any row was deleted
        if (!deletedData || deletedData.length === 0) {
            return { 
                error: { message: "Application not found or you don't have permission" }, 
                success: false 
            }
        }
        console.log("Application deleted successfully:", deletedData)
        return { data: deletedData[0], success: true }

    } catch (error) {
        console.error("Unexpected error:", error)
        return { error: { message: error.message }, success: false }
    }
}