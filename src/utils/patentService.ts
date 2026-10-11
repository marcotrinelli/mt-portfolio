/**
 * Patent data from the backend (api.marcotrinelli.com), and the grouping the patents page renders
 */

import type { PatentTopic, PatentTopics } from "../types/portfolio";

export interface Inventor {
  inventorNameText: string;
  firstName?: string;
  lastName?: string;
}

export interface Applicant {
  applicantNameText: string;
  firstName?: string;
  lastName?: string;
}

export interface Patent {
  title: string;
  applicationNumber: string;
  patentNumber?: string;
  publicationNumber?: string;
  status: string;
  statusCode?: number;
  filingDate?: string;
  grantDate?: string;
  inventors: Inventor[];
  applicants: Applicant[];
  abstract?: string;
  detailsUrl?: string;
  frontPageUrl?: string;
  isIssued: boolean;
  isPending: boolean;
  isContinuation?: boolean;
  applicationType?: string;
  publicationDate?: string;
  cpcCodes?: string[];
}

export interface PatentApiResponse {
  success: boolean;
  result: {
    patents: Patent[];
    count: number;
  };
}

export interface PatentData {
  patents: Patent[];
  totalCount: number;
}

const BACKEND_API_BASE_URL = "https://api.marcotrinelli.com/api/patents";

/**
 * Fetches patent data for a specific inventor from the backend
 */
export const fetchPatentsByInventor = async (
  inventorName: string,
  limit: number = 100
): Promise<PatentData> => {
  try {
    // Construct query parameters
    const queryParams = new URLSearchParams({
      inventorName: inventorName,
      limit: limit.toString(),
    });

    const response = await fetch(`${BACKEND_API_BASE_URL}?${queryParams}`, {
      method: "GET",
      // No Content-Type on a GET (it would make this a preflighted CORS request)
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Backend API request failed: ${response.status} ${response.statusText}`
      );
    }

    /** @type {PatentApiResponse} */
    const data: PatentApiResponse = await response.json();

    // Transform the API response to match our expected format
    return {
      patents: data.result.patents,
      totalCount: data.result.count,
    };
  } catch (error) {
    console.error("Error fetching patent data from backend:", error);
    throw error;
  }
};

// One card: a utility filing (continuations included) plus the provisionals it claims
export interface PatentEntry {
  title: string;
  topic: string;
  primary: Patent;
  provisionals: Patent[];
}

export interface TopicGroup {
  topic: string;
  entries: PatentEntry[];
}

export interface PatentSummary {
  issued: number;
  pending: number;
}

const SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "by",
  "for",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
]);

// USPTO returns some titles in ALL CAPS
const toTitleCase = (title: string): string => {
  if (title !== title.toUpperCase()) {
    return title;
  }
  return title
    .toLowerCase()
    .split(" ")
    .map((w, i) =>
      i > 0 && SMALL_WORDS.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join(" ");
};

const isProvisional = (p: Patent): boolean =>
  p.applicationType === "Provisional";

const titleKey = (p: Patent): string => p.title.trim().toLowerCase();

// The first code that matches wins, USPTO lists the main classification first
const topicFromCpc = (
  codes: string[],
  topics: PatentTopic[]
): string | undefined => {
  for (const code of codes) {
    const topic = topics.find((t) =>
      t.cpcPrefixes.some((prefix) => code.startsWith(prefix))
    );
    if (topic) {
      return topic.name;
    }
  }
  return undefined;
};

/**
 * One entry per utility filing, in API order. A provisional is attached to the
 * earliest utility filing with its title (the API exposes no continuity data,
 * and the application claiming a provisional reuses its title)
 */
export const groupPatentEntries = (
  patents: Patent[],
  patentTopics: PatentTopics
): PatentEntry[] => {
  const claimants = new Map<string, Patent>();
  patents
    .filter((p) => !isProvisional(p))
    .forEach((p) => {
      const current = claimants.get(titleKey(p));
      if (!current || (p.filingDate ?? "") < (current.filingDate ?? "")) {
        claimants.set(titleKey(p), p);
      }
    });

  // Filings sharing a title share a topic (provisionals carry no CPC codes)
  const codesByTitle = new Map<string, string[]>();
  patents.forEach((p) => {
    codesByTitle.set(titleKey(p), [
      ...(codesByTitle.get(titleKey(p)) ?? []),
      ...(p.cpcCodes ?? []),
    ]);
  });
  const topicOf = (p: Patent): string =>
    patentTopics.overrides[titleKey(p)] ??
    topicFromCpc(codesByTitle.get(titleKey(p)) ?? [], patentTopics.topics) ??
    patentTopics.fallback;

  // A provisional with no utility filing yet keeps its own card
  return patents
    .filter((p) => !isProvisional(p) || !claimants.has(titleKey(p)))
    .map((p) => ({
      title: toTitleCase(p.title),
      topic: topicOf(p),
      primary: p,
      provisionals:
        claimants.get(titleKey(p)) === p
          ? patents.filter(
              (o) => isProvisional(o) && titleKey(o) === titleKey(p)
            )
          : [],
    }));
};

/** Entries per topic in display order, the fallback last, empty topics left out */
export const groupByTopic = (
  entries: PatentEntry[],
  patentTopics: PatentTopics
): TopicGroup[] =>
  [...patentTopics.topics.map((t) => t.name), patentTopics.fallback]
    .map((topic) => ({
      topic,
      entries: entries.filter((e) => e.topic === topic),
    }))
    .filter((g) => g.entries.length > 0);

/** Counts issued patents and pending applications (provisionals never issue, so they are left out) */
export const summarizePatents = (patents: Patent[]): PatentSummary => ({
  issued: patents.filter((p) => p.isIssued).length,
  pending: patents.filter((p) => p.isPending && !isProvisional(p)).length,
});

const patentService = {
  fetchPatentsByInventor,
  groupPatentEntries,
  groupByTopic,
  summarizePatents,
};

export default patentService;
