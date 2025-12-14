# 🏢 AssetVerse - Corporate Asset Management System

**AssetVerse** is a comprehensive B2B (Business-to-Business) web application designed to streamline asset management for companies. It bridges the gap between HR Managers and Employees, allowing efficient tracking of returnable and non-returnable assets, managing inventory, and handling asset requests seamlessly.

---

## 🔗 Live Links

- **Live Site URL:** [Insert Your Live Site Link Here] (e.g., Netlify/Vercel)
- **Client Repository:** [Insert GitHub Client Repo Link]
- **Server Repository:** [Insert GitHub Server Repo Link]

---

## 📖 Purpose

The primary goal of AssetVerse is to solve the chaos of tracking company equipment.

- **For HR Managers:** It provides a digital inventory to track who holds which asset, stock availability, and employee management.
- **For Employees:** It offers a simple interface to request necessary equipment and track their assigned assets.
- **Automation:** The system handles auto-affiliation, meaning employees are automatically linked to a company upon their first approved asset request.

---

## ✨ Key Features

### 🛡️ General

- **Secure Authentication:** Email/Password & Google Social Login using Firebase.
- **Role-Based Access Control (RBAC):** Separate dashboards and protected routes for HR Managers and Employees.
- **JWT Authorization:** Secure API endpoints using JSON Web Tokens.
- **Responsive Design:** Fully responsive UI built with Tailwind CSS & DaisyUI.

### 👔 For HR Managers (Admin)

- **Asset Inventory:** Add, update, delete, and search assets with filter options (Returnable/Non-returnable).
- **Request Management:** Approve or reject asset requests from employees.
- **Stock Management:** Automatic stock deduction upon approval.
- **Employee List:** View affiliated employees and remove them from the team if needed.
- **Package Control:** Limit on how many employees can be added based on the subscription package.

### 👨‍💼 For Employees

- **Request Assets:** Browse available company assets and request them with notes.
- **My Assets:** View list of assigned assets and status (Pending/Approved).
- **Auto-Affiliation:** Automatically join a company team when a request is approved.
- **My Team:** View other team members of the same company.
- **Return Assets:** Option to return "Returnable" assets.

---

## 🛠️ Technologies & NPM Packages Used

### Client Side (Frontend)

- **React.js:** Component-based UI library.
- **React Router DOM:** For seamless navigation.
- **Tailwind CSS & DaisyUI:** For modern and responsive styling.
- **Firebase:** For Authentication and hosting.
- **Axios:** For making HTTP requests.
- **@tanstack/react-query:** For data fetching, caching, and state management.
- **React Hook Form:** For efficient form handling.
- **React Hot Toast:** For beautiful notifications.
- **Recharts (Optional):** For visualizing data.

### Server Side (Backend)

- **Node.js & Express.js:** Runtime environment and framework.
- **MongoDB:** NoSQL Database for storing users, assets, and requests.
- **Mongoose:** ODM for MongoDB.
- **JWT (JSON Web Token):** For secure authentication.
- **Cors & Dotenv:** Middleware for security and environment variables.
- **Cookie Parser:** For parsing cookies.

---

## 🧪 Admin/Test Credentials

You can use these credentials to test the HR features without registering:

- **Email:** `hr@testcompany.com`
- **Password:** `123456`

---

## 🚀 Local Installation Guide

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [Your Client Repo URL]
   cd corpAsset-hub-client
   npm install
   VITE_apiKey=your_api_key
   VITE_authDomain=your_auth_domain
   ...
   npm run dev
   ```

### 💡 টিপস:

1.  **`[Insert Your Live Site Link Here]`** এর জায়গায় আপনার Vercel বা Netlify এর লিংক দিন।
2.  **`[Your Name]`** এর জায়গায় আপনার নাম দিন।
3.  যদি গিটহাবে পুশ করেন, তাহলে এই ফাইলটি আপনার রিপোজিটরির মেইন পেজে সুন্দরভাবে শো করবে।
