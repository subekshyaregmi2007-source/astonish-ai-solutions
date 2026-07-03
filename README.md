# Astonish AI Solutions

> A modern full-stack AI consulting platform showcasing industry-standard development practices

Built with React 19, Express 5, and PostgreSQL 18.

![Tech Stack](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Express](https://img.shields.io/badge/Express-5-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue)

## Project Structure

```
├── frontend/          # React 19 + TypeScript + Vite
├── backend/           # Express 5 API server
├── database/          # Drizzle ORM + PostgreSQL
├── api-spec/          # OpenAPI specifications
├── api-client/        # Generated API client
├── api-zod/           # Zod validation schemas
└── scripts/           # Database seeding scripts
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL 16+

### Installation

```bash
pnpm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure your database:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/astonish
JWT_SECRET=your-secret-key
ADMIN_PASSWORD=admin123
```

### Database Setup

```bash
# Push schema to database
pnpm run db:push

# Seed with sample data
pnpm run db:seed
```

### Run Development Servers

**Terminal 1 - Backend API:**
```bash
pnpm run dev:api
```
Runs on: http://localhost:8080

**Terminal 2 - Frontend:**
```bash
pnpm run dev:frontend
```
Runs on: http://localhost:3000

## Features

### Public Website
- Solutions, Industries, Testimonials pages
- Articles blog with categorization
- Events listing (upcoming and past)
- Contact form with validation

### Admin Dashboard
- JWT authentication
- Real-time statistics and charts
- Inquiry management with CRUD operations
- Search, filter, and pagination
- Status management
- Internal notes system
- CSV export

## Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- React Query (TanStack Query)
- React Hook Form + Zod validation
- Radix UI components
- TanStack Table

**Backend:**
- Express 5
- PostgreSQL 18
- Drizzle ORM
- JWT authentication
- OpenAPI documentation

**Architecture:**
- Monorepo with pnpm workspaces
- Contract-first API development
- Type-safe database queries
- Comprehensive validation layers

## Scripts

```bash
# Development
pnpm run dev:api        # Start backend
pnpm run dev:frontend   # Start frontend

# Database
pnpm run db:push        # Push schema
pnpm run db:seed        # Seed data

# Build
pnpm run build          # Build all packages
pnpm run typecheck      # Type checking

# Code generation
pnpm run codegen        # Generate API client
```

## Admin Access

- **URL:** http://localhost:3000/admin
- **Password:** `admin123`

## API Documentation

Once the backend is running, view the OpenAPI documentation:

- **Swagger UI:** http://localhost:8080/api-docs
- **OpenAPI Spec:** http://localhost:8080/api-docs.json

## Project Highlights

### Architecture
- **Monorepo Structure:** 8 packages managed with pnpm workspaces
- **Type Safety:** End-to-end TypeScript with strict mode
- **Contract-First:** OpenAPI specifications drive development
- **Code Generation:** Auto-generated API clients from specs

### Security
- JWT-based authentication
- Bcrypt password hashing
- SQL injection prevention via Drizzle ORM
- Input validation at all layers (client + server)
- CORS configuration
- Environment variable management

### Performance
- React Query for efficient data fetching and caching
- Optimistic UI updates
- Lazy loading and code splitting
- Database indexing on frequently queried columns
- Connection pooling

### Code Quality
- ESLint configuration
- TypeScript strict mode
- Consistent code formatting
- Comprehensive error handling
- Structured logging with Pino

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

### Database Connection Issues
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Verify DATABASE_URL in .env
cat .env | grep DATABASE_URL
```

### Dependencies Not Installing
```bash
# Clear pnpm cache
pnpm store prune

# Reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Development Workflow

1. **Start Backend:** `pnpm run dev:api` (Terminal 1)
2. **Start Frontend:** `pnpm run dev:frontend` (Terminal 2)
3. **Make Changes:** Edit code in `frontend/` or `backend/`
4. **Hot Reload:** Changes auto-reload in browser
5. **Check Types:** `pnpm run typecheck`
6. **Test Features:** Open http://localhost:3000

## Database Schema

Main tables:
- `inquiries` - Contact form submissions
- `notes` - Internal notes for inquiries
- `solutions` - AI service offerings
- `case_studies` - Industry success stories
- `testimonials` - Client feedback
- `articles` - Blog posts
- `events` - Upcoming and past events

## Contributing

1. Create a feature branch
2. Make your changes
3. Run type checking: `pnpm run typecheck`
4. Test locally
5. Submit a pull request

## License

MIT

## Author

CET333 Product Development Project  
Rohan Khadka  
© 2026
