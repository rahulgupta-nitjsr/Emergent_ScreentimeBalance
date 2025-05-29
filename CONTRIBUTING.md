# Contributing to ScreenTime Balance PWA

Thank you for your interest in contributing to ScreenTime Balance! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Yarn package manager
- Git

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   gh repo fork yourusername/screentime-balance-pwa
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/screentime-balance-pwa.git
   cd screentime-balance-pwa
   ```

3. **Install dependencies**
   ```bash
   cd frontend
   yarn install
   ```

4. **Start development server**
   ```bash
   yarn dev
   ```

## 🔧 Development Workflow

### Branch Naming Convention
- `feature/feature-name` - For new features
- `bugfix/issue-description` - For bug fixes
- `docs/documentation-update` - For documentation changes
- `refactor/component-name` - For refactoring code

### Commit Message Format
```
type(scope): brief description

Detailed explanation of the change (if needed)

Fixes #issue-number
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

**Examples:**
```
feat(timers): add pause functionality to timers

Allow users to pause and resume timers instead of just start/stop.
This provides better UX for interrupted activities.

Fixes #42
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

### Test Requirements
- All new features must include tests
- Bug fixes should include regression tests
- Maintain at least 80% code coverage
- Tests should be descriptive and well-documented

## 📝 Code Style

### TypeScript Guidelines
- Use TypeScript for all new code
- Define proper interfaces for all data structures
- Use strict TypeScript configuration
- Avoid `any` type - use proper typing

### React Guidelines
- Use functional components with hooks
- Follow React best practices for state management
- Use proper prop typing with TypeScript
- Implement proper error boundaries

### CSS/Styling Guidelines
- Use TailwindCSS utility classes
- Follow mobile-first responsive design principles
- Maintain consistent spacing and typography
- Use semantic color names

### Code Formatting
We use Prettier and ESLint for code formatting:

```bash
# Format code
yarn format

# Lint code
yarn lint

# Fix linting issues
yarn lint:fix
```

## 📱 PWA Guidelines

### Performance
- Maintain lighthouse scores above 90
- Optimize images and assets
- Use lazy loading where appropriate
- Minimize bundle size

### Accessibility
- Follow WCAG 2.1 AA guidelines
- Use semantic HTML elements
- Provide proper ARIA labels
- Test with screen readers

### Offline Functionality
- Ensure core features work offline
- Implement proper cache strategies
- Handle network failures gracefully
- Provide offline indicators

## 🐛 Bug Reports

### Before Submitting
1. Check existing issues to avoid duplicates
2. Test with the latest version
3. Reproduce the bug in a clean environment

### Bug Report Template
```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Device: [e.g. iPhone 12, Desktop]
- OS: [e.g. iOS 15, Windows 11]
- Browser: [e.g. Chrome 96, Safari 15]
- App Version: [e.g. 1.2.0]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
A clear description of what you want to see added.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
How do you envision this feature working?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other context, mockups, or examples.
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Data export functionality
- [ ] Advanced analytics dashboard
- [ ] Notification system
- [ ] Dark mode theme
- [ ] Accessibility improvements

### Medium Priority
- [ ] Social features (sharing streaks)
- [ ] Custom activity types
- [ ] Goal setting system
- [ ] Advanced 3D visualizations
- [ ] Performance optimizations

### Good First Issues
- [ ] UI/UX improvements
- [ ] Documentation updates
- [ ] Test coverage improvements
- [ ] Bug fixes
- [ ] Accessibility fixes

## 📋 Pull Request Process

### Before Submitting
1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Run the test suite** and ensure all tests pass
4. **Update CHANGELOG.md** with your changes
5. **Ensure code follows style guidelines**

### Pull Request Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots of UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Code is well-commented
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process
1. Automated checks must pass (tests, linting, type checking)
2. At least one core maintainer review required
3. All feedback must be addressed
4. Final approval from project maintainer

## 🏗️ Project Architecture

### Key Directories
```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── store/         # Redux state management
├── utils/         # Helper functions
├── db/           # Database layer (IndexedDB)
├── types/        # TypeScript type definitions
└── assets/       # Static assets
```

### State Management
- Use Redux Toolkit for global state
- Keep component state local when possible
- Use custom hooks for reusable logic
- Follow Redux best practices

### Database Layer
- Use Dexie for IndexedDB operations
- Keep database logic separate from components
- Implement proper error handling
- Use TypeScript interfaces for data models

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

### Communication
- Use clear, descriptive language
- Be patient with questions and feedback
- Provide helpful context in discussions
- Tag relevant maintainers when needed

### Getting Help
- Check documentation first
- Search existing issues and discussions
- Join our Discord community (link)
- Tag @maintainers for urgent issues

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Annual contributor appreciation posts
- Special badges for long-term contributors

## 📞 Contact

- **Discord**: [Join our community](https://discord.gg/screentime-balance)
- **Email**: contribute@screentimebalance.app
- **Twitter**: [@ScreenTimeBalance](https://twitter.com/screentimebalance)

---

Thank you for contributing to ScreenTime Balance! Together, we're building a better relationship with technology. 🚀