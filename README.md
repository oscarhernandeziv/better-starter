This is Better Starter, a Next.js 15 starter kit for 2025.

## Environment Configuration

This application uses environment-specific configuration to dynamically switch between development and production environments:

### Development Environment

Development environment variables (localhost URLs) are defined in `.env.development` and automatically loaded when running in development mode.

### Production Environment

Production environment variables (production URLs) are defined in `.env.production` and automatically loaded when deploying to production.

### Environment Helper Functions

Environment-specific values can be accessed using helper functions in `src/config/env.ts`:

- `getAppUrl()` - Returns the appropriate app URL for the current environment
- `getAuthUrl()` - Returns the appropriate auth URL for the current environment
- `isDevelopment()` - Returns true if in development environment
- `isProduction()` - Returns true if in production environment