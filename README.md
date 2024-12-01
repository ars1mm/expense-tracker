# Expense Dashboard

A modern, user-friendly expense tracking application built with React and Firebase. Track your personal finances with ease, visualize spending patterns, and manage your budget effectively.

[![CI](https://github.com/[username]/expense-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/[username]/expense-dashboard/actions/workflows/ci.yml)

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
- Node.js (v18 or higher)
- npm
- Firebase account

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

## Testing

The project uses Jest and React Testing Library for testing. The test files are located in the `tests` directory.

### Running Tests

- Run all tests:
```bash
npm test
```

- Run tests in watch mode (for development):
```bash
npm run test:watch
```

- Generate test coverage report:
```bash
npm run test:coverage
```

### Test Structure

- `/tests/components/` - Component tests
  - `/auth/` - Authentication component tests
  - `/shared/` - Shared component tests (Button, Input, etc.)
- `/tests/setupTests.js` - Test setup and configuration

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

## Continuous Integration

This project uses GitHub Actions for continuous integration. The CI pipeline:

- Runs on every push and pull request to main/master branches
- Tests the codebase using Jest
- Builds the application
- Uploads build artifacts

The workflow runs on Node.js versions 18.x and 20.x to ensure compatibility.

### CI Environment Variables

The following secrets need to be set in your GitHub repository settings:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

To set up these secrets:
1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add each Firebase configuration value

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
