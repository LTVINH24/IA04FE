# User Registration System - Frontend

A complete user registration and authentication system built with React, featuring a modern UI with shadcn/ui and Tailwind CSS.

## 🚀 Features

- **User Registration**: Complete sign-up form with comprehensive validation
- **User Login**: Secure login interface with form validation
- **Password Validation**: Real-time validation with requirements:
  - Minimum 6 characters
  - At least one lowercase letter
  - At least one uppercase letter
  - At least one digit
  - At least one special symbol
- **Email Validation**: Proper email format checking
- **React Query Integration**: Efficient API state management with caching
- **React Hook Form**: Form validation and management
- **Responsive Design**: Mobile-first responsive UI
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Clear success notifications

## 🛠️ Technologies Used

- **React** - UI library
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form validation and management
- **@tanstack/react-query** - Server state management
- **Axios** - HTTP client
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

## 🔧 Installation

1. [Install NodeJS](https://nodejs.org/en/download/current)

2. **Open folder:** ia03fe with VSCode
3. **Install dependencies**:
   ```bash
   npm install
   ```

## 🚦 Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

## 🌐 Backend API Configuration

The application is configured to connect to a backend API at:
- **Base URL**: `http://localhost:8080`
- **Register Endpoint**: `POST /user/register`
- **Login Endpoint**: `POST /user/login`



## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```
## Web Url: `https://ia-03-fe-eight.vercel.app`
## Note
Since the website is deployed on a free hosting service, it may take 15–20 seconds for the host to start up. Please be patient.