# Events 🎉

A simple event management app where users can view, add, edit, and delete events — but only after logging in!  
Built using Vue 3, Pinia, and Bootstrap 5.

## 🚀 Project Overview

**Events** is a web application that allows authenticated users to:

- View a list of upcoming events.
- Add new events.
- Edit existing events.
- Delete events they no longer wish to attend.
- Log out securely when done.

The app uses a protected routing system where:

- If you're **not logged in**, you're redirected to the **login page**.
- If you're **logged in**, you're redirected to the **home page** where the list of events is shown.

## 🛠️ Tech Stack

- **Vue 3**
- **Vue Router** for page navigation and route protection
- **Pinia** for state management
- **Axios** for HTTP requests
- **Bootstrap 5** for UI styling
- **LocalStorage** to store the **auth token** after successful login
- **REST API** for fetching and updating event data

## 📂 Project Structure & Implementation Choices

- `modules/`: Main views such as `LoginPage.vue` and `MainPage.vue`.
- `components/`: Reusable components (event cards, forms, etc).
- `store/`: Pinia store modules for managing authentication and events.
- **Authentication** is token-based — the token is stored in LocalStorage after login.
- **Navigation Guards** are implemented using Vue Router to protect routes.


## 🧪 Setup Instructions

You can run the project in one of two ways:

1. Run locally:
   - Clone the repo:
     ```bash
     git clone https://github.com/nadeenhazem/Events-Website.git
     cd events
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

2. Visit the live app directly:
   - Open this URL in your browser:  
     [https://events-app-457.netlify.app/login]
