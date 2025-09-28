# Secure CRM

A modern, secure Customer Relationship Management (CRM) application built with Next.js 15, React 19, and TypeScript.

## 🚀 Tech Stack

- **Next.js 15.5.4** with App Router and Turbopack
- **React 19.1.0** with TypeScript
- **Tailwind CSS v4** with PostCSS integration
- **Shadcn UI** components (New York style)
- **Radix UI** primitives for accessibility
- **Supabase** for authentication and database
- **Lucide React** for icons
- **Zod** for schema validation
- **Vitest** for testing

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   └── ui/                # Shadcn UI components
└── lib/
    └── utils.ts           # Utility functions
```

## 🛠 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional, for containerized development)

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd secure-crm
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server with Turbopack:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run tests
npm run test
```

## 🐳 Docker Setup

### Development with Docker

Run the application in development mode using Docker:

```bash
# Build and start the development container
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop the containers
docker-compose down
```

### Production Docker

Build and run the production container:

```bash
# Build the production image
docker build -t secure-crm .

# Run the production container
docker run -p 3000:3000 secure-crm
```

Or use docker-compose for production:

```bash
# Start production environment
docker-compose -f docker-compose.yml up --build

# Stop production environment
docker-compose down
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🎨 UI Components

This project uses Shadcn UI components with the "New York" style variant. Components are built on top of Radix UI primitives for accessibility.

### Adding New Components

```bash
# Add a new Shadcn component
npx shadcn@latest add [component-name]
```

Components follow the established patterns:
- Use the `cn()` utility for conditional styling
- Variants defined with `class-variance-authority`
- Import paths use `@/` aliases

## 🔒 Features

- **Authentication**: Secure user authentication with Supabase
- **Dashboard**: Modern dashboard interface
- **Responsive Design**: Mobile-first responsive design
- **Type Safety**: Full TypeScript coverage
- **Accessibility**: WCAG compliant components
- **Modern UI**: Clean, professional interface with Shadcn UI

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Docker Deployment

Deploy using the production Docker image:

```bash
# Build for production
docker build -t secure-crm .

# Deploy to your container platform
docker run -p 3000:3000 secure-crm
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
