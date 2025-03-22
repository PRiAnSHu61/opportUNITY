from flask import Flask, request, jsonify
import pandas as pd
import random

app = Flask(__name__)

# Load dataset
df = pd.read_csv("model/merged_job_dataset.csv")

# Example course mapping
course_mapping = {
    "python": "Python Programming Course",
    "data analysis": "Data Analysis with Python",
    "cybersecurity": "Cybersecurity Fundamentals",
    "customer support": "Customer Service Excellence",
}
def recommend_jobs_with_courses(disability, skills, work_mode, location, page=1, per_page=5):
    try:
        # Ensure inputs are lists
        disability_list = [d.strip().lower() for d in disability] if isinstance(disability, list) else []
        skills_list = [s.strip().lower() for s in skills] if isinstance(skills, list) else []
        work_mode_list = [wm.strip().lower() for wm in work_mode] if isinstance(work_mode, list) else []
        location_list = [loc.strip().lower() for loc in location] if isinstance(location, list) else []

        # Convert dataset columns to lowercase for filtering
        df["Disability"] = df["Disability"].astype(str).str.lower().fillna("")
        df["Skills Required"] = df["Skills Required"].astype(str).str.lower().fillna("")
        df["Work Mode"] = df["Work Mode"].astype(str).str.lower().fillna("")
        df["Workplace Location"] = df["Workplace Location"].astype(str).str.lower().fillna("")

        # Step 1: Apply filtering based on disability, work mode, and location
        filtered_df = df[
            (df["Disability"].apply(lambda x: any(d in x for d in disability_list)) if disability_list else True) &
            (df["Work Mode"].apply(lambda x: any(wm in x for wm in work_mode_list)) if work_mode_list else True) &
            (df["Workplace Location"].apply(lambda x: any(loc in x for loc in location_list)) if location_list else True)
        ]

        # Step 2: If no strict match, relax filtering (OR conditions)
        if filtered_df.empty:
            filtered_df = df[
                df["Disability"].apply(lambda x: any(d in x for d in disability_list)) |
                df["Work Mode"].apply(lambda x: any(wm in x for wm in work_mode_list)) |
                df["Workplace Location"].apply(lambda x: any(loc in x for loc in location_list))
            ]

        # Step 3: If still empty, fallback to skill-based matching
        skills_set = set(skills_list)
        if filtered_df.empty:
            filtered_df = df[df["Skills Required"].apply(lambda x: any(skill in x for skill in skills_set))]

        # Step 4: If still empty, return random jobs as a fallback
        if filtered_df.empty:
            filtered_df = df.sample(min(per_page, len(df)))

        # Step 5: Define job matching logic
        def calculate_match(job_skills, user_skills):
            job_skills_set = set(job_skills.split(", ")) if job_skills else set()
            matched_skills = job_skills_set.intersection(user_skills)
            match_percentage = (len(matched_skills) / len(job_skills_set)) if job_skills_set else 0
            return match_percentage

        # Categorize jobs:
        highly_matched_df = filtered_df[
            filtered_df["Skills Required"].apply(lambda x: calculate_match(x, skills_set) >= 0.8)
        ]
        jobs_after_courses_df = filtered_df[
            (filtered_df["Skills Required"].apply(lambda x: 0.5 <= calculate_match(x, skills_set) < 0.8))
        ]
        suggested_jobs_df = filtered_df[
            (filtered_df["Skills Required"].apply(lambda x: calculate_match(x, skills_set) < 0.5))
        ]

        # Process jobs
        def process_jobs(df):
            jobs = []
            for _, row in df.iterrows():
                job_skills = set(row["Skills Required"].split(", ")) if row["Skills Required"] else set()
                matched_skills = job_skills.intersection(skills_set)
                missing_skills = job_skills - matched_skills
                recommended_courses = [course_mapping.get(skill, f"Course for {skill}") for skill in missing_skills]

                jobs.append({
                    "Job Role": row["Job Role"],
                    "Skills Required": row["Skills Required"],
                    "Matched Skills": ", ".join(matched_skills) if matched_skills else "None",
                    "Missing Skills": ", ".join(missing_skills) if missing_skills else "None",
                    "Recommended Courses": ", ".join(recommended_courses) if recommended_courses else "No courses needed",
                    "Salary (INR)": row["Salary (INR)"],
                    "Workplace Location": row["Workplace Location"]
                })
            return jobs

        # Pagination
        start_idx = (page - 1) * per_page
        end_idx = start_idx + per_page

        return {
            "highly_matched": process_jobs(highly_matched_df.iloc[start_idx:end_idx]),
            "jobs_after_courses": process_jobs(jobs_after_courses_df.iloc[start_idx:end_idx]),
            "suggested_jobs": process_jobs(suggested_jobs_df.iloc[start_idx:end_idx]),
            "has_more": len(filtered_df) > end_idx
        }

    except Exception as e:
        print(f"Error in job recommendation: {str(e)}")
        return {"error": str(e)}, 500

    try:
        # Ensure inputs are lists
        disability_list = [d.strip().lower() for d in disability] if isinstance(disability, list) else []
        skills_list = [s.strip().lower() for s in skills] if isinstance(skills, list) else []
        work_mode_list = [wm.strip().lower() for wm in work_mode] if isinstance(work_mode, list) else []
        location_list = [loc.strip().lower() for loc in location] if isinstance(location, list) else []

        # Convert dataset columns to lowercase for filtering
        df["Disability"] = df["Disability"].astype(str).str.lower().fillna("")
        df["Skills Required"] = df["Skills Required"].astype(str).str.lower().fillna("")
        df["Work Mode"] = df["Work Mode"].astype(str).str.lower().fillna("")
        df["Workplace Location"] = df["Workplace Location"].astype(str).str.lower().fillna("")

        # Step 1: Apply filtering based on disability, work mode, and location
        filtered_df = df[
            (df["Disability"].apply(lambda x: any(d in x for d in disability_list)) if disability_list else True) &
            (df["Work Mode"].apply(lambda x: any(wm in x for wm in work_mode_list)) if work_mode_list else True) &
            (df["Workplace Location"].apply(lambda x: any(loc in x for loc in location_list)) if location_list else True)
        ]

        # Step 2: If no strict match, relax filtering (OR conditions)
        if filtered_df.empty:
            filtered_df = df[
                df["Disability"].apply(lambda x: any(d in x for d in disability_list)) |
                df["Work Mode"].apply(lambda x: any(wm in x for wm in work_mode_list)) |
                df["Workplace Location"].apply(lambda x: any(loc in x for loc in location_list))
            ]

        # Step 3: If still empty, fallback to skill-based matching
        skills_set = set(skills_list)
        if filtered_df.empty:
            filtered_df = df[df["Skills Required"].apply(lambda x: any(skill in x for skill in skills_set))]

        # Step 4: If still empty, return random jobs as a fallback
        if filtered_df.empty:
            filtered_df = df.sample(min(per_page, len(df)))

        # Step 5: Process jobs (match skills, recommend courses)
        def process_jobs(df):
            jobs = []
            for _, row in df.iterrows():
                job_skills = set(row["Skills Required"].split(", ")) if row["Skills Required"] else set()
                matched_skills = job_skills.intersection(skills_set)
                missing_skills = job_skills - matched_skills
                recommended_courses = [course_mapping.get(skill, f"Course for {skill}") for skill in missing_skills]

                jobs.append({
                    "Job Role": row["Job Role"],
                    "Skills Required": row["Skills Required"],
                    "Matched Skills": ", ".join(matched_skills) if matched_skills else "None",
                    "Missing Skills": ", ".join(missing_skills) if missing_skills else "None",
                    "Recommended Courses": ", ".join(recommended_courses) if recommended_courses else "No courses needed",
                    "Salary (INR)": row["Salary (INR)"],
                    "Workplace Location": row["Workplace Location"]
                })
            return jobs

        # Pagination
        start_idx = (page - 1) * per_page
        end_idx = start_idx + per_page
        recommended_jobs = process_jobs(filtered_df.iloc[start_idx:end_idx])

        return {
            "recommendations": recommended_jobs,
            "has_more": len(filtered_df) > end_idx
        }

    except Exception as e:
        print(f"Error in job recommendation: {str(e)}")
        return {"error": str(e)}, 500

@app.route('/recommend_jobs', methods=['POST'])
def recommend_jobs():
    try:
        if request.content_type != 'application/json':
            return jsonify({"error": "Unsupported Media Type"}), 415

        data = request.get_json()
        if not data:
            return jsonify({"error": "No valid input provided"}), 400

        page = int(data.get("page", 1))
        per_page = int(data.get("per_page", 5))

        recommendations = recommend_jobs_with_courses(
            data.get("disability", []),
            data.get("skills", []),
            data.get("work_mode", []),
            data.get("location", []),  # Fix: Treat location as a list
            page,
            per_page
        )

        return jsonify(recommendations), 200
    except Exception as e:
        print(f"API Error: {str(e)}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)
