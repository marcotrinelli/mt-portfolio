/**
 * Service for fetching patent data from your backend API
 */

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
 * Fetches patent data for a specific inventor from your backend service
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
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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

const patentService = {
  fetchPatentsByInventor,
};

export default patentService;
