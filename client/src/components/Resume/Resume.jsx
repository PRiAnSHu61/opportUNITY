import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const Resume = () => {
  const navigate = useNavigate();
  const { currentUser, userPreferences } = useAuth();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [resumeBlob, setResumeBlob] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null);
  const downloadLinkRef = useRef(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
          
          // If user already has a resume URL, set it
          if (userDocSnap.data().resumeUrl) {
            setResumeUrl(userDocSnap.data().resumeUrl);
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    
    fetchUserData();
  }, [currentUser]);

  // Function to generate resume content
  const generateResumeContent = (userData) => {
    // This is a simplified example of generating resume content
    // In a production app, you'd want a more sophisticated template engine
    
    const {
      displayName,
      email,
      phone,
      location,
      skills = [],
      education = [],
      experience = [],
      summary = "",
      certifications = [],
      languages = [],
      projects = []
    } = userData;
    
    let content = "";
    
    // Header
    content += `${displayName || "Name"}\n`;
    content += `${email || ""} | ${phone || ""}\n`;
    content += `${location || ""}\n\n`;
    
    // Summary
    if (summary) {
      content += "PROFESSIONAL SUMMARY\n";
      content += `${summary}\n\n`;
    }
    
    // Skills
    if (skills.length > 0) {
      content += "SKILLS\n";
      content += skills.join(", ") + "\n\n";
    }
    
    // Experience
    if (experience.length > 0) {
      content += "PROFESSIONAL EXPERIENCE\n";
      experience.forEach(exp => {
        content += `${exp.title || "Role"} at ${exp.company || "Company"}\n`;
        content += `${exp.startDate || ""} - ${exp.endDate || "Present"}\n`;
        content += `${exp.description || ""}\n\n`;
      });
    }
    
    // Education
    if (education.length > 0) {
      content += "EDUCATION\n";
      education.forEach(edu => {
        content += `${edu.degree || "Degree"} in ${edu.field || "Field"}\n`;
        content += `${edu.institution || "Institution"}, ${edu.location || ""}\n`;
        content += `${edu.startDate || ""} - ${edu.endDate || ""}\n\n`;
      });
    }
    
    // Certifications
    if (certifications && certifications.length > 0) {
      content += "CERTIFICATIONS\n";
      certifications.forEach(cert => {
        content += `${cert.name || ""}, ${cert.issuer || ""}, ${cert.date || ""}\n`;
      });
      content += "\n";
    }
    
    // Projects
    if (projects && projects.length > 0) {
      content += "PROJECTS\n";
      projects.forEach(project => {
        content += `${project.name || ""}\n`;
        content += `${project.description || ""}\n\n`;
      });
    }
    
    return content;
  };

  // Function to create PDF from user data
  const createResumePDF = async (userData) => {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    
    const page = pdfDoc.addPage([612, 792]); // Letter size
    const { width, height } = page.getSize();
    const margin = 50;
    let y = height - margin;
    const lineHeight = 14;
    
    // Helper function for adding text
    const addText = (text, fontSize = 10, isBold = false, indent = 0) => {
      page.drawText(text, {
        x: margin + indent,
        y,
        size: fontSize,
        font: isBold ? timesRomanBoldFont : timesRomanFont,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight + (fontSize - 10); // Adjust vertical position based on font size
    };
    
    // Helper function for adding section title
    const addSectionTitle = (title) => {
      y -= 10; // Add extra space before section
      addText(title.toUpperCase(), 12, true);
      addText("".padStart(width - 2 * margin, "_"), 8); // Add underline
      y -= 5; // Add space after underline
    };
    
    // Name and contact info
    addText(userData.displayName || "Name", 16, true);
    y -= 5;
    
    const contactInfo = [
      userData.email || "",
      userData.phone || "",
      userData.location || ""
    ].filter(Boolean).join(" | ");
    addText(contactInfo, 10);
    y -= 10;
    
    // Summary
    if (userData.summary) {
      addSectionTitle("Professional Summary");
      addText(userData.summary, 10);
      y -= 10;
    }
    
    // Skills
    if (userData.skills && userData.skills.length > 0) {
      addSectionTitle("Skills");
      addText(userData.skills.join(", "));
      y -= 10;
    }
    
    // Experience
    if (userData.experience && typeof userData.experience === "string") {
        addSectionTitle("Professional Experience");
      
        // Convert the string into an array (assuming it's comma-separated or newline-separated)
        const experiences = userData.experience.split("\n").map(exp => exp.trim());
      
        experiences.forEach(exp => {
          if (exp) {
            addText(exp, 11, false); 
          }
        });
      
        y -= 5;
      } else {
        console.warn("userData.experience is empty or not a string");
      }
      
    if (userData.education && typeof userData.education === "string") {
        addSectionTitle("Education");
      
        const educationEntries = userData.education.split("\n").map(edu => edu.trim());
      
        educationEntries.forEach(edu => {
          if (edu) {
            addText(edu, 11, false); 
          }
        });
      
        y -= 5;
      } else {
        console.warn("userData.education is empty or not a string");
      }
      
    
    // Certifications
    if (userData.certifications && userData.certifications.length > 0) {
      addSectionTitle("Certifications");
      
      userData.certifications.forEach(cert => {
        addText(`${cert.name || ""}, ${cert.issuer || ""}, ${cert.date || ""}`);
      });
      
      y -= 10;
    }
    
    // Projects
    if (userData.projects && userData.projects.length > 0) {
      addSectionTitle("Projects");
      
      userData.projects.forEach(project => {
        addText(project.name || "", 11, true);
        
        if (project.description) {
          const descLines = project.description.split('\n');
          descLines.forEach(line => {
            addText(line, 10, false, 10);
          });
        }
        
        y -= 5;
      });
    }
    
    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();
    
    // Create blob for download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return blob;
  };

  // Function to analyze resume and provide feedback
  const analyzeResume = (userData) => {
    const feedback = {
      type: "success",
      message: "Your resume has been generated successfully!",
      suggestions: [],
      improvements: [],
      strengths: []
    };
    
    // Check for basic completeness
    if (!userData.summary || userData.summary.length < 50) {
      feedback.suggestions.push("Add a more comprehensive professional summary (aim for 3-5 sentences)");
    } else {
      feedback.strengths.push("Your professional summary effectively highlights your background");
    }
    
    // Check experience entries
    if (!userData.experience || userData.experience.length === 0) {
      feedback.suggestions.push("Add your work experience to strengthen your resume");
    } else {
      let hasQuantifiableResults = false;
      let hasActionVerbs = false;
      
      // Check for action verbs and quantifiable results
      userData.experience.forEach(exp => {
        if (exp.description) {
          if (/increased|decreased|improved|developed|managed|led|created|implemented/i.test(exp.description)) {
            hasActionVerbs = true;
          }
          
          if (/\d+%|\d+ percent|\$\d+|\d+ times/i.test(exp.description)) {
            hasQuantifiableResults = true;
          }
        }
      });
      
      if (!hasActionVerbs) {
        feedback.suggestions.push("Use strong action verbs in your experience descriptions (e.g., 'developed', 'implemented', 'increased')");
      } else {
        feedback.strengths.push("Good use of action verbs in your experience section");
      }
      
      if (!hasQuantifiableResults) {
        feedback.suggestions.push("Add quantifiable achievements to your experience (e.g., 'increased sales by 20%', 'reduced costs by $50K')");
      } else {
        feedback.strengths.push("Effective use of quantifiable results in your experience");
      }
    }
    
    // Check skills
    if (!userData.skills || userData.skills.length < 5) {
      feedback.suggestions.push("Add more skills relevant to your target positions (aim for 8-12 skills)");
    } else {
      feedback.strengths.push("Your skills section is comprehensive");
    }
    
    // Check education
    if (!userData.education || userData.education.length === 0) {
      feedback.suggestions.push("Add your educational background to complete your resume");
    }
    
    // Check for projects or certifications
    if ((!userData.projects || userData.projects.length === 0) && 
        (!userData.certifications || userData.certifications.length === 0)) {
      feedback.suggestions.push("Consider adding projects or certifications to showcase additional qualifications");
    }
    
    return feedback;
  };

  const handleGenerateResume = async () => {
    if (!currentUser) {
      navigate("/login", { state: { from: "/resume", message: "Please log in to generate a resume" } });
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      // Get the latest user data from Firestore if we don't have it already
      let profileData = userData;
      if (!profileData) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (!userDocSnap.exists()) {
          throw new Error("User profile not found. Please complete your profile first.");
        }
        
        profileData = userDocSnap.data();
        setUserData(profileData);
      }
      
      // Check if user has enough profile data to generate a resume
      const requiredFields = ["displayName", "email", "skills", "education", "experience"];
      const missingFields = requiredFields.filter(field => 
        !profileData[field] || 
        (Array.isArray(profileData[field]) && profileData[field].length === 0) ||
        (typeof profileData[field] === 'string' && profileData[field].trim() === '')
      );
      
      if (missingFields.length > 0) {
        throw new Error(`Please complete your profile before generating a resume. Missing: ${missingFields.join(", ")}`);
      }
      
      // Generate resume PDF
      const resumeBlob = await createResumePDF(profileData);
      setResumeBlob(resumeBlob);
      
      // Create object URL for preview and download
      const objectUrl = URL.createObjectURL(resumeBlob);
      setResumeUrl(objectUrl);
      
      // Upload to Firebase Storage
      const storageRef = ref(storage, `resumes/${currentUser.uid}/generated-resume.pdf`);
      await uploadBytes(storageRef, resumeBlob);
      
      // Get Firebase Storage URL
      const firebaseUrl = await getDownloadURL(storageRef);
      
      // Update user document with resume information
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        resumeUrl: firebaseUrl,
        resumeGenerated: true,
        resumeGeneratedAt: new Date(),
      });
      
      // Analyze resume and provide feedback
      const feedbackResults = analyzeResume(profileData);
      setFeedback(feedbackResults);
      
    } catch (err) {
      console.error("Error generating resume:", err);
      setError(err.message || "Failed to generate resume. Please try again later.");
    } finally {
      setGenerating(false);
    }
  };

  const handleResumeUpload = async (e) => {
    if (!currentUser) {
      navigate("/login", { state: { from: "/resume", message: "Please log in to upload a resume" } });
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF or Word document (.pdf, .doc, .docx)");
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setLoading(true);
    setError(null);
    setUploadedFileName(file.name);

    try {
      // Upload file to Firebase Storage
      const storageRef = ref(storage, `resumes/${currentUser.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // Create object URL for local preview
      const objectUrl = URL.createObjectURL(file);
      setResumeUrl(objectUrl);
      setResumeBlob(file);
      
      // Update user document with resume information
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        resumeUrl: downloadURL,
        resumeFilename: file.name,
        resumeUploadedAt: new Date(),
      });
      
      // Provide feedback based on user profile - this would be more sophisticated in a real app
      // In a real implementation, you might use an AI service to analyze the resume
      const feedbackData = {
        type: "info",
        message: "Your resume has been analyzed",
        suggestions: [
          "Consider tailoring your resume for each specific job application",
          "Ensure your contact information is up-to-date and professional",
          "Add a LinkedIn profile URL to enhance your professional presence"
        ],
        improvements: [
          "Format your resume with consistent fonts and spacing",
          "Keep your resume to 1-2 pages maximum",
          "Use bullet points instead of paragraphs for better readability"
        ],
        strengths: [
          "Having an existing resume gives you a great foundation to build upon",
          "You've taken an important step in your job search process",
          "Your initiative in seeking feedback shows professional dedication"
        ]
      };
      
      setFeedback(feedbackData);
    } catch (err) {
      console.error("Error uploading resume:", err);
      setError("Failed to upload resume. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleDownloadResume = () => {
    if (resumeBlob) {
      const url = URL.createObjectURL(resumeBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = userData ? `${userData.displayName.replace(/\s+/g, '_')}_Resume.pdf` : 'your_resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 p-8">
            <h1 className="text-3xl font-bold text-white">Resume Management</h1>
            <p className="text-white/90 mt-2">Create, upload, and get feedback on your resume</p>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Generate Resume Card */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <svg className="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-center mb-4">Generate Resume</h2>
                <p className="text-gray-600 text-center mb-6">
                  We'll create a professional resume using your profile information. Make sure your profile is complete.
                </p>
                <button
                  onClick={handleGenerateResume}
                  disabled={generating}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : "Generate Resume"}
                </button>
              </div>

              {/* Upload Resume Card */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <svg className="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-center mb-4">Upload Resume</h2>
                <p className="text-gray-600 text-center mb-6">
                  Already have a resume? Upload it to get personalized feedback and improvement suggestions.
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleResumeUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
                <button
                  onClick={triggerFileInput}
                  disabled={loading}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </span>
                  ) : "Upload Resume"}
                </button>
                {uploadedFileName && (
                  <p className="mt-3 text-sm text-center text-gray-500">
                    Uploaded: {uploadedFileName}
                  </p>
                )}
              </div>
            </div>

            {/* Feedback Section */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`mt-8 p-6 rounded-lg border ${
                  feedback.type === "success" 
                    ? "bg-green-50 border-green-200" 
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <h3 className={`text-lg font-semibold mb-3 ${
                  feedback.type === "success" ? "text-green-700" : "text-blue-700"
                }`}>
                  {feedback.message}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {/* Strengths Section */}
                  {feedback.strengths && feedback.strengths.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-green-700">Strengths:</h4>
                      <ul className="space-y-2">
                        {feedback.strengths.map((item, index) => (
                          <li key={`strength-${index}`} className="flex items-start">
                            <svg className="h-5 w-5 mt-0.5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Suggestions Section */}
                  {feedback.suggestions && feedback.suggestions.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-amber-700">Improvement Suggestions:</h4>
                      <ul className="space-y-2">
                        {feedback.suggestions.map((suggestion, index) => (
                          <li key={`suggestion-${index}`} className="flex items-start">
                            <svg className="h-5 w-5 mt-0.5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="text-gray-700">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* General Tips Section */}
                {feedback.improvements && feedback.improvements.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2 text-blue-700">General Resume Tips:</h4>
                    <ul className="space-y-2">
                      {feedback.improvements.map((improvement, index) => (
                        <li key={`improvement-${index}`} className="flex items-start">
                          <svg className="h-5 w-5 mt-0.5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Resume Actions */}
                {resumeUrl && (
                  <div className="mt-6 flex flex-wrap gap-4">
                    <a 
                      href={resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-4 py-2 rounded-md ${
                        feedback.type === "success" 
                          ? "bg-green-600 hover:bg-green-700" 
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white transition-colors`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview Resume
                    </a>
                    
                    <button
                      onClick={handleDownloadResume}
                      className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Resume
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Resume Preview Section */}
            {resumeUrl && !feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 rounded-lg border border-gray-200 bg-gray-50"
              >
                <h3 className="text-lg font-semibold mb-3">Resume Preview</h3>
                <div className="flex justify-center mt-4">
                  <div className="flex space-x-4">
                    <a 
                      href={resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview Resume
                    </a>
                    
                    <button
                      onClick={handleDownloadResume}
                      className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Resume
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile Completion Notice */}
            {(!userData || Object.keys(userData).length === 0) && (
              <div className="mt-8 p-6 rounded-lg border border-amber-200 bg-amber-50">
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-amber-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium text-amber-800 mb-2">Complete Your Profile</h3>
                    <p className="text-amber-700">
                      To generate a professional resume, please complete your profile information including work experience, education, and skills.
                    </p>
                    <button
                      onClick={() => navigate("/profile")}
                      className="mt-4 inline-flex items-center px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Go to Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Tips */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Resume Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex">
                <svg className="h-6 w-6 text-indigo-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Keep it concise</h4>
                  <p className="text-sm text-gray-600">Limit your resume to 1-2 pages with relevant information.</p>
                </div>
              </div>
              <div className="flex">
                <svg className="h-6 w-6 text-indigo-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Use quantifiable results</h4>
                  <p className="text-sm text-gray-600">Include specific achievements with numbers when possible.</p>
                </div>
              </div>
              <div className="flex">
                <svg className="h-6 w-6 text-indigo-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Tailor for each job</h4>
                  <p className="text-sm text-gray-600">Customize your resume for different job applications.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;