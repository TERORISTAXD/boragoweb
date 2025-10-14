# Contributing to BoragoWeb

Thank you for your interest in contributing to BoragoWeb! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Maintain professionalism

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/BoragoWeb.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### 1. Set Up Environment

```bash
# Copy environment variables
cp .env.example .env.local

# Fill in your credentials
# See README.md for details
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Make Changes

- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### 4. Test Your Changes

```bash
# Run linter
npm run lint

# Run type check
npm run type-check

# Run tests
npm test

# Run E2E tests
npm run test:e2e
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

Use conventional commit messages:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper types, avoid `any`
- Use interfaces for object shapes
- Export types when needed

### React Components

- Use functional components with hooks
- Prefer server components when possible
- Use client components only when needed
- Keep components focused and small

### File Structure

```
component/
├── ComponentName.tsx      # Component implementation
├── ComponentName.test.tsx # Tests
└── index.ts              # Exports
```

### Naming Conventions

- Components: `PascalCase`
- Files: `PascalCase` for components, `camelCase` for utilities
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- CSS classes: Use Tailwind utilities

### Comments

- Write self-documenting code
- Add comments for complex logic
- Document public APIs
- Use JSDoc for functions

## Testing

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### E2E Tests

```typescript
describe('Checkout Flow', () => {
  it('completes purchase successfully', () => {
    cy.visit('/shop')
    cy.get('[data-testid="product-card"]').first().click()
    cy.get('[data-testid="add-to-cart"]').click()
    // ... rest of test
  })
})
```

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Commits follow conventional format

### PR Description

Include:
- What changes were made
- Why the changes were needed
- How to test the changes
- Screenshots (for UI changes)
- Related issues

### Review Process

1. Automated checks must pass
2. At least one approval required
3. Address review feedback
4. Squash commits if requested
5. Maintainer will merge

## Project Structure

```
BoragoWeb/
├── app/              # Next.js pages and routes
├── components/       # Reusable components
├── lib/             # Utility functions and configs
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
├── styles/          # Global styles
├── public/          # Static assets
└── supabase/        # Database schema and migrations
```

## Common Tasks

### Adding a New Page

1. Create file in `app/` directory
2. Export default component
3. Add metadata
4. Update navigation if needed

### Adding a New Component

1. Create component file in `components/`
2. Add TypeScript types
3. Write tests
4. Export from index file

### Adding a Database Table

1. Update `supabase/schema.sql`
2. Update `types/database.ts`
3. Add RLS policies
4. Update seed data if needed

### Adding an API Route

1. Create route in `app/api/`
2. Add proper error handling
3. Validate inputs
4. Add tests

## Reporting Issues

### Bug Reports

Include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details

### Feature Requests

Include:
- Clear description
- Use case
- Proposed solution
- Alternative solutions considered

## Questions?

- Open a discussion on GitHub
- Check existing issues and PRs
- Review documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to BoragoWeb! 🎉
