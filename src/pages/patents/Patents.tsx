import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHero from "../../components/pageHero/PageHero";
import PatentCard from "../../components/patentCard/PatentCard";
import Button from "../../components/button/Button";
import ReactGA from "react-ga4";
import { patentsHeader, patentTopics } from "../../portfolio";
import patentService, {
  Patent,
  PatentSummary,
  TopicGroup,
} from "../../utils/patentService";
import patentsSnapshot from "../../data/patents.json";
import "./Patents.css";

// Same accents as the status badges on `PatentCard`
const ISSUED_COLOR = "#4CAF50";
const PENDING_COLOR = "#78909C";

const PatentStatItem = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <div className="patents-stats-item">
    <span className="patents-stats-value">{value}</span>
    <span className="caps-label">
      <span className="patents-stats-dot" style={{ backgroundColor: color }} />
      {label}
    </span>
  </div>
);

const PatentStats = ({ summary }: { summary: PatentSummary }) => {
  const { issued, pending } = summary;
  const total = issued + pending;

  return (
    <div className="patents-stats">
      <div className="patents-stats-figures">
        <div className="patents-stats-item">
          <span className="metric-value">{total}</span>
          <span className="caps-label">US patents</span>
        </div>
        <PatentStatItem label="Issued" value={issued} color={ISSUED_COLOR} />
        <PatentStatItem label="Pending" value={pending} color={PENDING_COLOR} />
      </div>
      <div className="patents-stats-bar" aria-hidden="true">
        <span
          style={{
            width: `${(issued / total) * 100}%`,
            backgroundColor: ISSUED_COLOR,
          }}
        />
        <span
          style={{
            width: `${(pending / total) * 100}%`,
            backgroundColor: PENDING_COLOR,
          }}
        />
      </div>
    </div>
  );
};

interface PatentTopicFilterProps {
  groups: TopicGroup[];
  total: number;
  selected: string | null;
  onSelect: (topic: string | null) => void;
}

const PatentTopicFilter: React.FC<PatentTopicFilterProps> = ({
  groups,
  total,
  selected,
  onSelect,
}) => {
  const chips: { topic: string | null; label: string; count: number }[] = [
    { topic: null, label: "All", count: total },
    ...groups.map(({ topic, entries }) => ({
      topic,
      label: topic,
      count: entries.length,
    })),
  ];

  return (
    <div
      className="chip-list patents-topics"
      role="group"
      aria-label="Filter by topic"
    >
      {chips.map(({ topic, label, count }) => (
        <button
          key={label}
          type="button"
          className="chip"
          aria-pressed={selected === topic}
          onClick={() => onSelect(topic)}
        >
          {label}
          <span className="patents-topic-chip-count">{count}</span>
        </button>
      ))}
    </div>
  );
};

const SNAPSHOT_PATENTS = patentsSnapshot.patents as Patent[];

const Patents: React.FC = () => {
  const [patents, setPatents] = useState<Patent[]>(SNAPSHOT_PATENTS);
  const [patentsError, setPatentsError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const entries = useMemo(
    () => patentService.groupPatentEntries(patents, patentTopics),
    [patents]
  );
  const groups = useMemo(
    () => patentService.groupByTopic(entries, patentTopics),
    [entries]
  );
  // A topic can vanish when live data replaces the snapshot
  const activeTopic = groups.some((g) => g.topic === selectedTopic)
    ? selectedTopic
    : null;
  const visibleGroups = activeTopic
    ? groups.filter((g) => g.topic === activeTopic)
    : groups;

  // Marks where grid rows wrap, so a topic's rule stops at the row end and is labelled again on the next row.
  // In a single column, only the topic's first card keeps its rule
  const gridRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) {
      return;
    }
    const markRows = (): void => {
      const items = Array.from(grid.children) as HTMLElement[];
      items.forEach((item, i) => {
        const prev = items[i - 1];
        const next = items[i + 1];
        item.toggleAttribute(
          "data-row-start",
          !prev || prev.offsetTop !== item.offsetTop
        );
        item.toggleAttribute(
          "data-row-end",
          !next || next.offsetTop !== item.offsetTop
        );
      });
      grid.toggleAttribute(
        "data-single-column",
        items.every((item) => item.hasAttribute("data-row-start"))
      );
    };
    markRows();
    // Next frame, since marking can resize the grid and a resize inside the callback loops
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(markRows);
    });
    observer.observe(grid);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [entries, activeTopic]);

  const handleTopicSelect = (topic: string | null): void => {
    setSelectedTopic(topic);
    ReactGA.event("patent_filter", { topic: topic ?? "All" });
  };
  const summary = useMemo(
    () => patentService.summarizePatents(patents),
    [patents]
  );

  // Render the bundled snapshot right away, then swap in live USPTO data
  const fetchPatents = async (): Promise<void> => {
    try {
      const patentData = await patentService.fetchPatentsByInventor(
        "Marco Trinelli"
      );
      // An empty live result means the API is misbehaving, not that the patents are gone
      if (patentData.patents.length !== 0) {
        setPatents(patentData.patents);
      }
    } catch (error) {
      setPatentsError(
        `Live USPTO data is unavailable right now, showing the records saved on ${patentsSnapshot.fetchedAt}.`
      );
    }
  };

  useEffect(() => {
    fetchPatents();
  }, []);

  return (
    <div>
      <Header pageTitle={patentsHeader.title} />
      <PageHero
        eyebrow={patentsHeader.title}
        title={patentsHeader.headline}
        titleAccent={patentsHeader.headlineAccent}
        lede={patentsHeader.caption}
      >
        <PatentStats summary={summary} />
        {patentsError && (
          <p className="patents-error-message" role="status">
            {patentsError}
          </p>
        )}
      </PageHero>
      <section className="page-section patents-section">
        {groups.length > 1 && (
          <PatentTopicFilter
            groups={groups}
            total={entries.length}
            selected={activeTopic}
            onSelect={handleTopicSelect}
          />
        )}
        {/* One grid in topic order, each topic's cards sharing a labelled rule */}
        <div className="patents-container" ref={gridRef}>
          {visibleGroups.map(({ topic, entries: groupEntries }) =>
            groupEntries.map((entry, index) => (
              <div
                key={entry.primary.applicationNumber}
                className="patents-grid-item reveal-on-scroll"
              >
                <div
                  className={`patents-topic-rule caps-label${
                    index === 0 ? " patents-topic-rule-start" : ""
                  }${
                    index === groupEntries.length - 1
                      ? " patents-topic-rule-end"
                      : ""
                  }`}
                >
                  <span className="patents-topic-rule-label">{topic}</span>
                </div>
                <PatentCard entry={entry} />
              </div>
            ))
          )}
        </div>
        {patentsHeader.googlePatentsLink && (
          <div className="page-actions patents-actions">
            <Button
              text="See on Google Patents"
              to={patentsHeader.googlePatentsLink}
              external
              variant="secondary"
            />
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Patents;
