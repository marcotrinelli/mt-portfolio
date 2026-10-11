# Marco Trinelli - Portfolio

Personal portfolio website: who I am, selected work, my journey, patents and a contact form.

## Features

- Responsive layout for desktop and mobile
- Dark/light mode (follows the OS setting until toggled)
- Pages: home (skills and projects), about (journey and hobbies), patents and contact
- Contact form

## Getting Started

```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # production build
npm run deploy   # deploy to GitHub Pages
```

## Content

All copy lives in `src/portfolio.ts`.

- **Projects**: `projectSections` renders in order on the home page. Add a section (e.g. "Open source", "Early work") or a project there; `year` and `tags` are optional.
- **Patents**: the patents page reads live from `api.marcotrinelli.com` and falls back to `src/data/patents.json`, which also feeds the home page counts. Refresh it with `npm run fetch-patents` when a patent issues or a new application publishes.
- **CV**: put the PDF in `public/` and set `greeting.resumeLink` (e.g. `"./cv.pdf"`) to show the Download CV button on the About page.

## Tech Stack

- **Framework**: React 17
- **Language**: TypeScript
- **Styling**: SCSS + Styled Components
- **Carousel**: Embla Carousel
- **Routing**: React Router v6
- **Forms**: Formspree React
- **Icons**: React Icons
- **Analytics**: Google Analytics 4
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

