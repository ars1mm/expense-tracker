# Expense Dashboard

A modern expense tracking application with multi-currency support, built with React, Firebase Authentication, and Supabase.

## 🌟 Features

- 💰 Multi-currency expense tracking
- 🔄 Real-time currency conversion
- 📊 Visual expense statistics
- 🗂️ Category-based organization
- 🔐 Secure authentication with Firebase
- 📱 Responsive design
- ⚡ Real-time updates with Supabase

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Authentication**: Firebase Auth
- **Database**: Supabase
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Type Checking**: PropTypes

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Supabase account

## 🚀 Getting Started

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
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id

   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   Run the following SQL in your Supabase SQL editor:
   ```sql
   -- Create expenses table
   CREATE TABLE IF NOT EXISTS expenses (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       description TEXT NOT NULL,
       amount DECIMAL(10,2) NOT NULL,
       currency TEXT NOT NULL,
       category TEXT NOT NULL,
       date DATE NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
   );

   -- Enable Row Level Security
   ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

   -- Create a policy that allows all operations
   CREATE POLICY "Enable all operations for all users" ON expenses
       FOR ALL
       USING (true)
       WITH CHECK (true);
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎯 Features in Detail

### Expense Management
- Add expenses in multiple currencies
- Delete expenses
- Categorize expenses
- Date-based tracking

### Statistics Dashboard
- Total expenses with currency conversion
- Highest expense tracking
- Category-wise breakdown
- Latest expense tracking

### Currency Support
- Multiple currency options
- Real-time currency conversion
- Persistent currency selection

## 🔒 Security

- Firebase Authentication for secure user management
- Supabase Row Level Security (RLS) for data protection
- Environment variables for sensitive configuration

## 🚧 Known Limitations

- Exchange rates are currently hardcoded (future update will integrate a real-time exchange rate API)
- Basic error handling (will be enhanced in future updates)

## 🔜 Upcoming Features

- [ ] Real-time exchange rates integration
- [ ] Advanced data visualization
- [ ] Budget tracking and alerts
- [ ] Export functionality
- [ ] Enhanced error handling
- [ ] User preferences
- [ ] Mobile app version

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📊 Testing

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

## 📈 Project Structure

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

## 📈 Environment Setup

The application requires the following environment variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📈 Continuous Integration

This project uses GitHub Actions for continuous integration. The CI pipeline:

- Runs on every push and pull request to main/master branches
- Tests the codebase using Jest
- Builds the application
- Uploads build artifacts

The workflow runs on Node.js versions 14.x and 16.x to ensure compatibility.

### CI Environment Variables

The following secrets need to be set in your GitHub repository settings:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

To set up these secrets:
1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add each configuration value

## 📈 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 📈 Security

- Environment variables are used for sensitive data
- Firebase Authentication handles user security
- Input validation and sanitization implemented
- Protected routes for authenticated users

## 📈 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 Future Enhancements

- [ ] Dark mode support
- [ ] Multiple currency support
- [ ] Export data functionality
- [ ] Mobile app version
- [ ] Advanced analytics
- [ ] Budget planning features

## 📈 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📈 Acknowledgments

- Firebase for authentication and database services
- Supabase for database services
- Tailwind CSS for styling
- React community for excellent documentation and support

## 📈 Contact


Arsim Ajvazi - [@arsim_ajv](https://instagram.com/arsim_ajv)

Project Link: [https://github.com/yourusername/expense-dashboard](https://github.com/yourusername/expense-dashboard)

---

Made with ❤️ for better financial management
