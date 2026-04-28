import supabaseClient from "@/utils/supabase";

export async function getJobs(token,{location,company_id,searchTerm}) {
    const supabase=await supabaseClient(token)
    
    let query=supabase.from("jobs").select("*")

    if(location){
        query=query.eq("location",location)
    }

    
    if(company_id){
        query=query.eq("company_id",company_id)
    }

    
    if(searchTerm){
        query=query.ilike("title",`%${searchTerm}%`)
    }
    const{data,error}=await query

    if(error){
        console.error("error",error);
        return null
    }
   return data

}  
  
export async function postJobs(token,formData,userId) {
    
    const supabase=await supabaseClient(token)

    let {data:existingCompany}=await supabase
    .from("companies")
    .select("id")
    .eq("name",formData.name)
    .single()

    let companyId;

    if(!existingCompany){
        const {data:newCompany ,error :companyError}=await supabase
        .from("companies")
        .insert({
            name:formData.name,
            logo_url:formData.logo_url,
            email:formData.email,
            website:formData.website
        })
        .select()
        .single()

        if(companyError) {
            console.log(companyError);
            return {error:companyError,success:false}
        }
       companyId=newCompany.id

    }else  companyId=existingCompany.id
   
    console.log("companyId:",companyId);
    const {data:jobData,error:joberror}=await supabase
    .from("jobs")
    .insert({
       recruiter_id:userId,
       title:formData.title,
       comapny_id:companyId,
       description:formData.description,
       location:formData.location,
       requirements:formData.requirements,
       job_type:formData.job_type,
       experience_level:formData.experience_level,
       salary_min:formData.salary_min,
       salary_max:formData.salary_max,
    })
    .select()
    .single()

    if(joberror){
        console.log("job error:",joberror);
            return {error:joberror,success:false}

    }
    return {data:jobData ,success:true}
}

export async function getMyJobs(token, recruiterId) {
    console.log("recruiterId", recruiterId);
    const supabase = await supabaseClient(token)
    
    const query = supabase
        .from("jobs")
        .select(`
            *,
            company:comapny_id (
                name,
                logo_url
            )
        `)
        .eq("recruiter_id", recruiterId)

    const { data, error } = await query

    if (error) {
        console.log("error", error);
        return null
    }
    
    // Transform data to flat structure as per your requirement
    const transformedData = data?.map(job => ({
        id: job.id,
        title: job.title,
        description: job.description,
        location: job.location,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        job_type: job.job_type,
        experience_level: job.experience_level,
        requirements: job.requirements,
        created_at: job.created_at,
        recruiter_id: job.recruiter_id,
        company_id: job.company_id,
        isOpen:job.isOpen,
        // Company details flattened
        company: job.company?.name || "Company",
        logo: job.company?.logo_url || "/companies/default.svg",
        // Keep original company object if needed
        company_details: job.company
    }))
    
    console.log("Transformed jobs data:", transformedData);
    return transformedData
}
