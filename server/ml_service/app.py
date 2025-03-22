from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load dataset
df = pd.read_csv("model/merged_job_dataset.csv")

# Course mapping
course_mapping = {
    "python": "Python Programming Course",
    "data analysis": "Data Analysis with Python",
    "cybersecurity": "Cybersecurity Fundamentals",
    "customer support": "Customer Service Excellence",
}

def recommend_jobs_with_courses(disability, skills, work_mode, location, page=1, per_page=5):
    try:
        # Ensure inputs are lists
        disability_list = [str(d).strip().lower() for d in (disability if isinstance(disability, list) else [disability])]
        skills_list = [str(s).strip().lower() for s in (skills if isinstance(skills, list) else [skills])]
        work_mode_list = [str(wm).strip().lower() for wm in (work_mode if isinstance(work_mode, list) else [work_mode])]
        location = ", ".join(location).strip().lower() if isinstance(location, list) else str(location).strip().lower()

        # Normalize dataset
        for col in ["Disability", "Skills Required", "Work Mode", "Workplace Location"]:
            df[col] = df[col].astype(str).str.lower().fillna("")

        skills_set = set(skills_list)

        def calculate_skill_match_score(job_skills_str):
            if not job_skills_str:
                return 0
            job_skills = set(s.strip() for s in job_skills_str.split(","))
            return len(job_skills.intersection(skills_set)) / max(len(job_skills), 1)

        def calculate_location_match_score(job_location):
            return 1.0 if location in job_location else 0.5 if job_location else 0

        def calculate_overall_score(row):
            skill_score = calculate_skill_match_score(row["Skills Required"])
            location_score = calculate_location_match_score(row["Workplace Location"])
            disability_match = any(d in row["Disability"] for d in disability_list)
            work_mode_match = any(wm in row["Work Mode"] for wm in work_mode_list)

            base_score = skill_score * 0.4 + location_score * 0.3
            if disability_match:
                base_score += 0.2
            if work_mode_match:
                base_score += 0.1

            return base_score

        df["overall_score"] = df.apply(calculate_overall_score, axis=1)
        sorted_df = df.sort_values("overall_score", ascending=False)

        def process_jobs(df):
            jobs = []
            for _, row in df.iterrows():
                job_skills = set(row["Skills Required"].split(",")) if row["Skills Required"] else set()
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

        # Pagination
        start_idx = (page - 1) * per_page
        end_idx = start_idx + per_page

        highly_matched_df = sorted_df[sorted_df["overall_score"] > 0.7].iloc[start_idx:end_idx]
        jobs_after_courses_df = sorted_df[(sorted_df["overall_score"] <= 0.7) & (sorted_df["overall_score"] > 0.4)].iloc[start_idx:end_idx]
        suggested_jobs_df = sorted_df[sorted_df["overall_score"] <= 0.4].iloc[start_idx:end_idx]

        return {
            "highly_matched": process_jobs(highly_matched_df),
            "jobs_after_courses": process_jobs(jobs_after_courses_df),
            "suggested_jobs": process_jobs(suggested_jobs_df),
            "has_more": len(sorted_df) > end_idx
        }

    except Exception as e:
        return {"error": str(e)}, 500

@app.route('/recommend_jobs', methods=['POST'])
def recommend_jobs():
    data = request.get_json()
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

if __name__ == '__main__':
    app.run(debug=True, port=5002)
