# Expense Dashboard

A modern, user-friendly expense tracking application built with React and Firebase. Track your personal finances with ease, visualize spending patterns, and manage your budget effectively.

## Features

- 🔐 Secure Authentication
  - Email/Password login
  - Google Sign-in
  - Password reset functionality
  - Protected routes

- 💰 Expense Management
  - Track expenses in Macedonian Denars (MKD)
  - Categorize transactions
  - Add, edit, and delete expenses
  - View spending history

- 📊 Analytics
  - Visual expense breakdowns
  - Monthly spending trends
  - Category-wise analysis
  - Budget tracking

## Tech Stack

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **State Management**: React Hooks
- **Build Tool**: Vite

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expense-dashboard.git
   cd expense-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
expense-dashboard/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── SignupForm.jsx
│   │   ├── shared/
│   │   │   ├── Button.jsx
│   │   │   └── Input.jsx
│   │   └── Auth.jsx
│   ├── config/
│   │   └── firebase.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env
└── package.json
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Environment Setup

The application requires the following environment variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Security

- Environment variables are used for sensitive data
- Firebase Authentication handles user security
- Input validation and sanitization implemented
- Protected routes for authenticated users

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Dark mode support
- [ ] Multiple currency support
- [ ] Export data functionality
- [ ] Mobile app version
- [ ] Advanced analytics
- [ ] Budget planning features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Firebase for authentication and database services
- Tailwind CSS for styling
- React community for excellent documentation and support

## Contact


Arsim Ajvazi - [@arsim_ajv](https://instagram.com/arsim_ajv)

Project Link: [https://github.com/yourusername/expense-dashboard](https://github.com/yourusername/expense-dashboard)

---

Made with ❤️ for better financial management
