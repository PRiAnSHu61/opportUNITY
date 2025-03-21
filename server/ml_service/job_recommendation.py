import pandas as pd

# Load dataset
df = pd.read_csv("model/merged_job_dataset.csv")

# Example course mapping (expand as needed)
course_mapping = {
    "python": "Python Programming Course",
    "data analysis": "Data Analysis with Python",
    "cybersecurity": "Cybersecurity Fundamentals",
    "customer support": "Customer Service Excellence",
}

def recommend_jobs_with_courses(disability, skills, work_mode, location):
    try:
        # Input validation
        if not disability or not skills or not work_mode or not location:
            print("Error: Missing input data.")
            return []

        print(f"\nUser Input:\n  Disabilities: {disability}\n  Skills: {skills}\n  Work Mode: {work_mode}\n  Location: {location}")

        # Normalize inputs (lowercase & stripping)
        disability_list = [d.strip().lower() for d in disability] if isinstance(disability, list) else []
        skills_list = [s.strip().lower() for s in skills] if isinstance(skills, list) else []
        work_mode_list = [wm.strip().lower() for wm in work_mode] if isinstance(work_mode, list) else []
        location = location.lower().strip() if isinstance(location, str) else ""

        # Convert dataset columns to lowercase for filtering
        df["Disability"] = df["Disability"].str.lower().fillna("")
        df["Skills Required"] = df["Skills Required"].str.lower().fillna("")
        df["Work Mode"] = df["Work Mode"].str.lower().fillna("")
        df["Workplace Location"] = df["Workplace Location"].str.lower().fillna("")

        # Step 1: Strict Filtering
        filtered_df = df[
            df["Disability"].apply(lambda x: any(d in x for d in disability_list)) &
            df["Work Mode"].apply(lambda x: any(wm in x for wm in work_mode_list)) &
            df["Workplace Location"].str.contains(location, case=False, na=False)
        ]

        print(f"Strict Match Found: {len(filtered_df)} jobs")

        # Step 2: Relax the filtering if no strict match
        if filtered_df.empty:
            filtered_df = df[
                df["Disability"].apply(lambda x: any(d in x for d in disability_list)) |
                df["Work Mode"].apply(lambda x: any(wm in x for wm in work_mode_list)) |
                df["Workplace Location"].str.contains(location, case=False, na=False)
            ]
            print(f"Relaxed Match Found: {len(filtered_df)} jobs")

        # Step 3: If still empty, find jobs based on skills match
        if filtered_df.empty:
            skills_set = set(skills_list)  # FIXED: Directly use skills_list
            filtered_df = df[df["Skills Required"].apply(lambda x: any(skill in x for skill in skills_set))]
            print(f"Skill-Based Match Found: {len(filtered_df)} jobs")

        # Step 4: Suggest courses for missing skills
        recommended_jobs = []
        for _, row in filtered_df.iterrows():
            job_skills = set(row["Skills Required"].split(", ")) if row["Skills Required"] else set()
            matched_skills = job_skills.intersection(skills_set)
            missing_skills = job_skills - matched_skills

            # Generate recommended courses
            recommended_courses = [course_mapping.get(skill, f"Course for {skill}") for skill in missing_skills]

            recommended_jobs.append({
                "Job Role": row["Job Role"],
                "Skills Required": row["Skills Required"],
                "Matched Skills": ", ".join(matched_skills) if matched_skills else "None",
                "Missing Skills": ", ".join(missing_skills) if missing_skills else "None",
                "Recommended Courses": ", ".join(recommended_courses) if recommended_courses else "No courses needed",
                "Salary (INR)": row["Salary (INR)"],
                "Workplace Location": row["Workplace Location"]
            })

        return recommended_jobs[:10]  # Return top 10 recommendations
    except Exception as e:
        print("Error in job recommendation:", str(e))
        return []
