# Marco Trinelli - Portfolio

A modern, responsive portfolio website built with React and TypeScript, showcasing professional experience, projects, skills, education, and hobbies.

## Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Dark/Light Mode**: Toggle between dark and light themes with persistent user preferences
- **Interactive Animations**: Engaging Lottie animations throughout the site
- **Dynamic Sections**:
  - Professional work experience
  - Education and certifications
  - Technical skills with software proficiency
  - Project showcases with GitHub integration
  - Blog posts and publications
  - Patents portfolio
  - Personal hobbies with animated cards
  - Contact form with Formspree integration
- **SEO Optimized**: Includes meta tags and structured data for better search engine visibility
- **Type-Safe**: Built with TypeScript for enhanced code quality and maintainability

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/marcotrinelli/mt-portfolio.git
cd mt-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration (if needed):
```bash
cp env.example .env
```

### Development

Run the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000) with hot-reload enabled.

### Building for Production

Create an optimized production build:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Deployment

Deploy to GitHub Pages:
```bash
npm run deploy
```

This will build the project and push it to the `gh-pages` branch.

## Analytics

Google Analytics 4 is wired through [`react-ga4`](https://github.com/codler/react-ga4), initialized in `src/index.tsx`. Hits are sent only from production builds (`NODE_ENV=production`, i.e. `npm run build` / `npm run deploy`); `npm start` and tests run it in `testMode` and send nothing. Page views are sent per route by `PageViewTracker` in `src/containers/Main.tsx` (with `page_location` built from the hash route, e.g. `/education`). Custom events, sent via `ReactGA.event`:

| Event | Parameters | Source |
| --- | --- | --- |
| `page_view` | `page_location`, `page_title` | Route change |
| `social_click` | `social_network`, `link_url` | `SocialMedia` icons |
| `patent_click` | `patent_number`, `patent_title`, `link_url` | "View PDF" on `PatentCard` |
| `project_click` | `project_name`, `link_text`, `link_url` | Project/patent links on Home |
| `generate_lead` | `form_name` | Contact form submitted successfully |

## Tech Stack

- **Framework**: React 17
- **Language**: TypeScript
- **Styling**: SCSS + Styled Components
- **Animations**: Lottie Web
- **Routing**: React Router v6
- **Forms**: Formspree React
- **Icons**: React Icons
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages

## Project Structure

```
src/
├── components/     # Reusable UI components
├── containers/     # Page-level container components
├── contexts/       # React context providers
├── hooks/          # Custom React hooks
├── pages/          # Route pages
├── theme/          # Theme configuration and styling
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── assets/         # Static assets (images, fonts, animations)
```

## Testing

Run the test suite:
```bash
npm test
```

## Customization

1. Update portfolio data in `src/portfolio.ts`
2. Modify theme colors in `src/_globalColor.scss` and `src/theme/Themes.ts`
3. Replace assets in `src/assets/` with your own images and animations
4. Configure personal information and social links in the portfolio configuration

## Scripts

- `npm start` - Start development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm run deploy` - Deploy to GitHub Pages
- `npm run format` - Format code with Prettier
- `npm run check-format` - Check code formatting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

