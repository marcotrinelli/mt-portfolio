import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import ReactGA from "react-ga4";

import "./StartupProjects.scss";
import { projectSections } from "../../portfolio";
import { ExternalLink, Project } from "../../types/portfolio";
import NoTranslate from "../../components/notranslate/notranslate";
import LinkIcon from "../../components/linkIcon/LinkIcon";
import CardBanner from "../../components/cardBanner/CardBanner";
import { IconType } from "react-icons";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaComments,
  FaFileLines,
  FaGithub,
  FaGlobe,
  FaYoutube,
} from "react-icons/fa6";

const handleLinkClick = (project: Project, link: ExternalLink): void => {
  ReactGA.event("project_click", {
    project_name: project.name,
    link_text: link.name,
    link_url: link.url,
  });
};

// Picks the glyph from the destination (so links in portfolio.ts stay plain name/url pairs)
const linkIcon = (url: string): IconType => {
  if (/youtube\.com|youtu\.be/.test(url)) return FaYoutube;
  if (/github\.com/.test(url)) return FaGithub;
  if (/uspto\.gov|dl\.acm\.org|doi\.org|\.pdf$/.test(url)) return FaFileLines;
  if (/forum/.test(url)) return FaComments;
  return FaGlobe;
};

// Above this many projects a section scrolls in a carousel instead of wrapping into rows
const CAROUSEL_THRESHOLD = 3;

// Slide widths come from the stylesheet (3.5 per view on desktop, 1.25 on phones):
// splitting the leftover fraction evenly keeps the whole cards centred, with the
// previous and next ones peeking in at both edges
const alignWithPeek = (viewSize: number, snapSize: number): number =>
  (viewSize - Math.floor(viewSize / snapSize) * snapSize) / 2;

function ProjectCard({ project }: { project: Project }): JSX.Element {
  return (
    <article className="project-card surface-card">
      {project.image && (
        <CardBanner
          src={project.image}
          alt={project.name}
          fit={project.imageFit}
          className="project-media"
        />
      )}
      <div className="project-body">
        {project.year && (
          <span className="project-year caps-label">{project.year}</span>
        )}
        <NoTranslate>
          <h3 className="project-title">{project.name}</h3>
        </NoTranslate>
        <p className="project-desc">{project.desc}</p>
        {project.tags && (
          <ul className="tag-list" aria-label="Topics">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
      {project.links && (
        <div className="project-links">
          {project.links.map((link) => {
            const Icon = linkIcon(link.url);
            return (
              <a
                key={link.url}
                className="project-link"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(project, link)}
              >
                <Icon className="project-link-icon" aria-hidden />
                {link.name}
                <FaArrowRight className="project-link-arrow" aria-hidden />
              </a>
            );
          })}
        </div>
      )}
    </article>
  );
}

// Where a slide position falls along the row of dots, as whole dot pitches plus dot
// widths. Between the last slide and the first the line wraps out of one end of the
// row and in at the other, travelling one dot width at each end rather than a pitch,
// so it never crosses empty space past the ends
const alongDots = (position: number, count: number): [number, number] => {
  if (position <= -1) return [position + 1, -1];
  if (position < 0) return [0, position];
  if (position <= count - 1) return [position, 0];
  if (position < count) return [count - 1, position - (count - 1)];
  return [position - 1, 1];
};

// Places one indicator span between two slide positions
const placeIndicator = (
  el: HTMLSpanElement | null,
  from: number,
  to: number,
  count: number,
  visible = true
): void => {
  if (!el) return;
  const [startPitches, startDots] = alongDots(from, count);
  const [endPitches, endDots] = alongDots(to, count);
  el.hidden = !visible;
  el.style.setProperty("--indicator-start-pitches", `${startPitches}`);
  el.style.setProperty("--indicator-start-dots", `${startDots}`);
  el.style.setProperty(
    "--indicator-length-pitches",
    `${endPitches - startPitches}`
  );
  el.style.setProperty("--indicator-length-dots", `${endDots - startDots}`);
};

// The dots stay dots; one indicator rides over them, following the live scroll
// position. It stretches toward the slide it is heading for and shrinks back into
// a dot on arrival: its stretch is the shorter of the distance travelled and the
// distance left, so it spans both dots halfway through a step and a whole jump
// halfway through a dot click
function CarouselDots({
  emblaApi,
  projects,
  selected,
}: {
  emblaApi: UseEmblaCarouselType[1];
  projects: Project[];
  selected: number;
}): JSX.Element {
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!emblaApi) return;
    let count = 1;
    let loops = 0; // whole laps unwrapped so far, in slides
    let lastRaw: number | null = null;
    let origin = 0; // where the current move started, in slides
    let stretch = 0; // how far each end reaches past the current position, in slides

    // Positions in slides from the first one. The looper shifts the location and
    // the target together by a whole lap, so unwrapping keeps both continuous
    const read = () => {
      const engine = emblaApi.internalEngine();
      const snaps = engine.scrollSnaps;
      const size = Math.abs(snaps[1] - snaps[0]) || 1;
      const toSlides = (location: number) => (snaps[0] - location) / size;
      const raw = toSlides(engine.offsetLocation.get());
      if (lastRaw !== null && Math.abs(raw - lastRaw) > count / 2) {
        loops += Math.round((lastRaw - raw) / count) * count;
      }
      lastRaw = raw;
      return {
        current: raw + loops,
        target: toSlides(engine.target.get()) + loops,
        dragging: engine.dragHandler.pointerDown(),
      };
    };

    const draw = () => {
      const { current, target, dragging } = read();
      // While dragging the target follows the pointer, so measure to the nearest slide
      stretch = dragging
        ? Math.abs(current - Math.round(current))
        : Math.min(Math.abs(current - origin), Math.abs(target - current));
      const tail = current - stretch;
      const start = ((tail % count) + count) % count;
      const end = start + 2 * stretch;
      placeIndicator(indicatorRef.current, start, end, count);
      // Past the last dot the line carries on into the first, as the slides loop round
      placeIndicator(
        wrapRef.current,
        start - count,
        end - count,
        count,
        end > count - 1
      );
    };

    // A new target restarts the move from here, keeping the current stretch so the line never jumps
    const onSelect = () => {
      const { current, target } = read();
      origin = current - Math.sign(target - current) * stretch;
      draw();
    };

    const onSettle = () => {
      origin = read().current;
      draw();
    };

    const reset = () => {
      count = Math.max(emblaApi.scrollSnapList().length, 1);
      loops = 0;
      lastRaw = null;
      onSettle();
    };

    reset();
    emblaApi
      .on("scroll", draw)
      .on("pointerDown", draw)
      .on("select", onSelect)
      .on("settle", onSettle)
      .on("reInit", reset);
    return () => {
      emblaApi
        .off("scroll", draw)
        .off("pointerDown", draw)
        .off("select", onSelect)
        .off("settle", onSettle)
        .off("reInit", reset);
    };
  }, [emblaApi]);

  return (
    <div className="projects-carousel-dots">
      {projects.map((project, index) => (
        <button
          key={project.name}
          type="button"
          className="projects-carousel-dot"
          onClick={() => emblaApi?.scrollTo(index)}
          aria-label={`Go to ${project.name}`}
          aria-current={index === selected}
        />
      ))}
      <span className="projects-carousel-indicator-track" aria-hidden>
        <span ref={indicatorRef} className="projects-carousel-indicator" />
        <span ref={wrapRef} className="projects-carousel-indicator" hidden />
      </span>
    </div>
  );
}

function ProjectCarousel({ projects }: { projects: Project[] }): JSX.Element {
  // Horizontal wheel and trackpad swipes (Magic Mouse, MacBook trackpad) drag the
  // carousel like a pointer would; vertical ones still scroll the page
  const [viewportRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: alignWithPeek },
    [WheelGesturesPlugin()]
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      className="projects-carousel"
      aria-roledescription="carousel"
      aria-label="Projects"
    >
      <div className="projects-carousel-viewport" ref={viewportRef}>
        <div className="projects-carousel-track">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="projects-carousel-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${projects.length}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
      <div className="projects-carousel-controls">
        <button
          type="button"
          className="projects-carousel-arrow"
          onClick={scrollPrev}
          aria-label="Previous project"
        >
          <FaChevronLeft aria-hidden />
        </button>
        <CarouselDots
          emblaApi={emblaApi}
          projects={projects}
          selected={selected}
        />
        <button
          type="button"
          className="projects-carousel-arrow"
          onClick={scrollNext}
          aria-label="Next project"
        >
          <FaChevronRight aria-hidden />
        </button>
      </div>
    </section>
  );
}

export default function StartupProject(): JSX.Element | null {
  if (projectSections.length === 0) {
    return null;
  }
  return (
    <div id="projects">
      {projectSections.map((section) => (
        <section key={section.title} className="page-section">
          <header className="page-section-header reveal-on-scroll">
            <h2 className="page-section-title">{section.title}</h2>
            {section.subtitle && (
              <p className="page-section-subtitle">
                {section.subtitle}
                {section.subtitleUrl && <LinkIcon url={section.subtitleUrl} />}
              </p>
            )}
          </header>
          <div className="reveal-on-scroll">
            {section.projects.length > CAROUSEL_THRESHOLD ? (
              <ProjectCarousel projects={section.projects} />
            ) : (
              <div className="projects-grid">
                <div className="projects-container">
                  {section.projects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
