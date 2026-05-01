import supabaseClient from "@/utils/supabase";
import { data } from "react-router-dom";

export async function getSavedJobs(token, { userId }) {
    const supabase = await supabaseClient(token)

    const { data, error } = await supabase
        .from("saved_jobs")
        .select(`
            saved_at:created_at,
            jobs:job_id (
                id,
                title,
                company:comapny_id (  
                    name,
                    logo_url
                ),
                location,
                salary_min,  
                salary_max,  
                job_type,
                created_at,
                requirements
            )
        `)
        .eq("user_id", userId)

    if(error){
        console.log("Error fetching saved jobs:", error);
        return null
    }
    
    console.log("Raw data from Supabase:", data);
    
    // Transform to exactly the format you need
    const transformedData = data?.map(item => ({
        id: item.jobs?.id,
        title: item.jobs?.title,
        company: item.jobs?.company?.name || "Company",
        logo: item.jobs?.company?.logo_url || "/companies/default.svg",
        location: item.jobs?.location,
        // Use salary_min and salary_max since those are your actual columns
        salary: item.jobs?.salary_min && item.jobs?.salary_max 
            ? `$${item.jobs.salary_min}k - $${item.jobs.salary_max}k`
            : "$80k - $120k",
        type: item.jobs?.job_type || "Full-time",
        posted: item.jobs?.created_at ? new Date(item.jobs.created_at).toLocaleDateString() : "Recently",
        tags: item.jobs?.requirements ? 
            (Array.isArray(item.jobs.requirements) ? item.jobs.requirements.slice(0,3) : item.jobs.requirements.split(',').slice(0,3)) 
            : ["New"],
        featured: false,
        saved_at: item.saved_at
    })) || []
    
    console.log("Transformed data:", transformedData);
    return transformedData  // Return transformedData, not data
}

export async function SaveJOb(token, options) {
    const supabase = await supabaseClient(token)
    const { userId, jobId } = options
    
    console.log("options", options);
    
    if (!userId || !jobId) {
        console.log('All fields are required');
        return { error: { message: "All fields are required" }, success: false }
    }

    // Check if already saved
    const { data: existedData } = await supabase
        .from("saved_jobs")
        .select("id")
        .eq("user_id", userId)
        .eq("job_id", jobId)
        .single()
    
    // If already saved, then UNSAVE (delete)
    if (existedData) {
        const { error } = await supabase
            .from("saved_jobs")
            .delete()
            .eq("user_id", userId)
            .eq("job_id", jobId)
        
        if (error) {
            console.log("Error in unsave:", error);
            return { data: error, success: false }
        }
        
        return { data: { message: "Job unsaved" }, success: true, action: "unsaved" }
    }
    
    // If not saved, then SAVE (insert)
    const { data: saveJobData, error } = await supabase
        .from("saved_jobs")
        .insert({ user_id: userId, job_id: jobId })
        .select()
        .single()
    
    if (error) {
        console.log("Error in save:", error.message);
        return { data: error, success: false }
    }
    
    console.log("saveJobData", saveJobData);
    return { data: saveJobData, success: true, action: "saved" }
}