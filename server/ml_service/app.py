from flask import Flask, request, jsonify
import pandas as pd

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
        if not disability or not skills or not work_mode or not location:
            return {"error": "Missing input data"}, 400

        # Convert inputs to lowercase
        disability_list = [d.strip().lower() for d in disability]
        skills_list = [s.strip().lower() for s in skills]
        work_mode_list = [wm.strip().lower() for wm in work_mode]
        location = location.lower().strip()

        # Convert dataset columns to lowercase
        df["Disability"] = df["Disability"].str.lower().fillna("")
        df["Skills Required"] = df["Skills Required"].str.lower().fillna("")
        df["Work Mode"] = df["Work Mode"].str.lower().fillna("")
        df["Workplace Location"] = df["Workplace Location"].str.lower().fillna("")

        # Initialize skills_set
        skills_set = set(skill.strip() for skill in skills_list)

        def calculate_skill_match_score(job_skills_str):
            if not job_skills_str:
                return 0
            job_skills = set(s.strip() for s in job_skills_str.split(","))
            return len(job_skills.intersection(skills_set)) / max(len(job_skills), 1)

        def calculate_location_match_score(job_location):
            if not job_location:
                return 0
            return 1.0 if location.lower() in job_location.lower() else 0.5

        def calculate_overall_score(row):
            skill_score = calculate_skill_match_score(row["Skills Required"])
            location_score = calculate_location_match_score(row["Workplace Location"])
            disability_match = any(d in row["Disability"].lower() for d in disability_list)
            work_mode_match = any(wm in row["Work Mode"].lower() for wm in work_mode_list)
            
            base_score = skill_score * 0.4 + location_score * 0.3
            if disability_match:
                base_score += 0.2
            if work_mode_match:
                base_score += 0.1
                
            return base_score

        def process_jobs(df, category):
            jobs = []
            for _, row in df.iterrows():
                job_skills = set(s.strip() for s in row["Skills Required"].split(",")) if row["Skills Required"] else set()
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
                    "Workplace Location": row["Workplace Location"],
                    "match_score": row["overall_score"]
                })
            return sorted(jobs, key=lambda x: x.pop("match_score"), reverse=True)

        # Calculate overall scores for all jobs
        df["overall_score"] = df.apply(calculate_overall_score, axis=1)
        
        # Sort all jobs by overall score
        sorted_df = df.sort_values("overall_score", ascending=False)

        # Calculate start and end indices for pagination
        start_idx = (page - 1) * per_page
        end_idx = start_idx + per_page

        # Get jobs for each category based on score thresholds
        highly_matched_df = sorted_df[sorted_df["overall_score"] > 0.7].iloc[start_idx:end_idx]
        jobs_after_courses_df = sorted_df[
            (sorted_df["overall_score"] <= 0.7) & 
            (sorted_df["overall_score"] > 0.4)
        ].iloc[start_idx:end_idx]
        suggested_jobs_df = sorted_df[sorted_df["overall_score"] <= 0.4].iloc[start_idx:end_idx]

        return {
            "highly_matched": process_jobs(highly_matched_df, "highly_matched"),
            "jobs_after_courses": process_jobs(jobs_after_courses_df, "jobs_after_courses"),
            "suggested_jobs": process_jobs(suggested_jobs_df, "suggested_jobs"),
            "has_more": len(sorted_df) > end_idx
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
            data.get("location", ""),
            page,
            per_page
        )

        return jsonify(recommendations), 200
    except Exception as e:
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)
