# DocAppoint 🩺
### A Modern MERN Stack Doctor Appointment Booking Platform

DocAppoint is a seamless, high-performance web application designed to bridge the gap between patients and medical consultants. Users can easily browse a panel of top-tier medical specialists, view highly detailed medical profiles, and book appointment slots securely. The application features advanced client-server state synchronization, complete responsive fluid layout design, and robust security management.

🔗 **Live Deployment URL:** [https://docappointment-client.vercel.app](https://docappointment-client.vercel.app) *(Replace with your actual Vercel live URL)*

---

## 🚀 Key Features

* **Hybrid Authentication Architecture:** Implements ultra-secure, session-based and JWT-driven route protection utilizing Better-Auth, ensuring complete credential isolation between public routes and private client layouts.
* **Dynamic Metadata & SEO Optimization:** Programmatically generates unique browser head metadata, titles, and open-graph descriptions for every dynamic consultant layout route to maximize search engine discoverability.
* **Real-Time Data Mutability:** Features an interactive user dashboard where patients can view scheduled appointments, update their booking criteria via pre-filled state-controlled modals, or cancel appointments with instant, zero-reload UI state transitions.
* **Live Direct Profile Syncing:** Integrates synchronized profile fields allowing users to update their personal identity parameters (Name and Avatar URL) with instant global cache-invalidation across server elements.
* **Robust Diagnostic Safety Nets:** Contains localized async boundary loading skeletons and dedicated, client-reparable global error screens (`error.js`) to guarantee a reliable user experience even during unexpected server dropouts.

---

## 🛠️ Tech Stack

**Frontend (Client):**
* Next.js 16 (Turbopack Compiler Engine)
* React.js 19
* Tailwind CSS (Modern Custom Theme Configurations)
* Better-Auth Client SDK
* React Icons & Gravity UI Icons

**Backend (Server):**
* Node.js & Express.js
* MongoDB Native Driver
* Jose-JWKS (JSON Web Key Sets Remote Verification Token Middleware)
* CORS & Dotenv

---

## 📦 Local Installation & Setup

Follow these steps to spin up the client application on your local machine:

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/docappointment-client.git](https://github.com/your-username/docappointment-client.git)