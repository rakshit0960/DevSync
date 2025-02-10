# DevSync

A modern authentication and dashboard application built with Next.js 14, featuring a sleek UI and comprehensive authentication system.

## Features

- **Modern Authentication**

  - Email/Password login
  - OAuth integration (GitHub, Google)
  - Secure session management
  - Protected routes

- **Sleek Dashboard**

  - Real-time analytics
  - Document management
  - System status monitoring
  - User profile management

- **Polished UI/UX**
  - Responsive design
  - Dark theme with gradient accents
  - Smooth animations
  - Custom 404 page
  - Loading states

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: NextAuth.js v5
- **Database**: Prisma with PostgreSQL
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form + Zod

## Getting Started

1. **Clone and Install**

```bash
git clone https://github.com/yourusername/devsync.git
cd devsync/client
npm install
```

2. **Environment Setup**
   Create a `.env` file with:

```env
# Auth
AUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth
AUTH_GITHUB_ID="your-github-oauth-id"
AUTH_GITHUB_SECRET="your-github-oauth-secret"
AUTH_GOOGLE_ID="your-google-oauth-id"
AUTH_GOOGLE_SECRET="your-google-oauth-secret"

# Database
DATABASE_URL="your-postgresql-url"
```

3. **Development**

```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
src/
├── actions/      # Server actions
├── app/         # App router pages
├── components/  # UI components
├── lib/        # Utilities
└── schema/     # Validation schemas
```

## Key Features

### Authentication

- Multiple auth providers
- Session persistence
- Protected routes
- Form validation

### Dashboard

- Analytics overview
- Document management
- System status
- User settings

### UI/UX

- Responsive design
- Dark theme
- Loading states
- Error handling
- Custom 404

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
