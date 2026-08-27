# JobPilot 🚀

JobPilot is a responsive job application tracking web application designed to help users discover job opportunities, track applications, monitor progress, and organize their job search in one place.

## 🌐 Live Demo

🔗 **Live Website:** https://job-pilot-git-main-tanvi-9e44.vercel.app/

## 📌 Features

- 🔐 Sign Up and Sign Out 
- 💾 Remember logged-in users using Local Storage
- 🚪 Log Out functionality
- 🔎 Search for job opportunities
- 📍 Filter jobs by location
- 💼 Filter jobs by job type
- 🌐 Fetch real-time job listings using the Adzuna API
- 👀 View job details and redirect to the original job posting
- 📋 Track jobs as applications
- 📊 Application analytics
- 📈 Application status tracking
- 📱 Responsive mobile-friendly design
- 📩 Contact form
- 💾 Store application data using Local Storage

## 📄 Pages

### 🏠 Home

Introduces JobPilot and explains the basic job-search workflow:

**Apply → Track → Get Hired**

### 💼 Opportunities

Provides an overview of the user's job-search opportunities and application progress.

### 🔎 Browse Jobs

Allows users to:

- Search for jobs
- Select a location
- Select a job type
- View available jobs
- Open the original job posting
- Track jobs

### 📋 Applications

Displays tracked job applications with their:

- Company
- Job role
- Application status
- Application date
- Search and filtering options

### 🎤 Interviews

Organizes interview-related applications and interview progress.

### 🎉 Offers

Displays job opportunities that have reached the offer stage.

### ❌ Rejected

Keeps track of rejected applications.

### 📊 Analytics

Provides a simple overview of the job search, including:

- Application Status
- Top Job Types
- Application Activity

### 📩 Contact

Allows users to send a message through the contact form.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Local Storage
- REST API
- Adzuna Jobs API
- Vercel
- Git & GitHub
- Font Awesome
- Google Fonts

## 🔌 API Integration

JobPilot uses the **Adzuna Jobs API** to retrieve job listings.

The API is accessed securely through a Vercel serverless API route so that API credentials are not exposed in the frontend.
