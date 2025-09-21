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
  applicationNumber: string;
  title: string;
  patentNumber?: string;
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

/**
 * Fallback patent data in case API is unavailable or returns no results
 * This can be updated manually with known patents
 */
export const getFallbackPatentData = (): PatentData => {
  return {
    patents: [
      {
        applicationNumber: "16/123456",
        title: "System and Method for Enhanced Network Security Protocol",
        patentNumber: "11,234,567",
        status: "Patented Case",
        statusCode: 150,
        filingDate: "2020-03-15",
        grantDate: "2023-02-14",
        inventors: [
          {
            inventorNameText: "Marco Trinelli",
            firstName: "Marco",
            lastName: "Trinelli",
          },
        ],
        applicants: [
          {
            applicantNameText: "Cisco Technology, Inc.",
            firstName: "Cisco",
            lastName: "Technology, Inc.",
          },
        ],
        abstract:
          "A system and method for implementing enhanced network security protocols in distributed computing environments.",
        detailsUrl: "https://patents.uspto.gov/patent/11234567",
        frontPageUrl: "https://pdfpiw.uspto.gov/.piw?PageNum=0&docid=11234567",
        isIssued: true,
        isPending: false,
      },
      {
        applicationNumber: "17/789012",
        title: "AI-Powered Edge Computing Optimization Framework",
        patentNumber: undefined,
        status: "Non Final Action Mailed",
        statusCode: 103,
        filingDate: "2021-11-08",
        grantDate: undefined,
        inventors: [
          {
            inventorNameText: "Marco Trinelli",
            firstName: "Marco",
            lastName: "Trinelli",
          },
        ],
        applicants: [
          {
            applicantNameText: "Cisco Technology, Inc.",
            firstName: "Cisco",
            lastName: "Technology, Inc.",
          },
        ],
        abstract:
          "An artificial intelligence framework for optimizing resource allocation in edge computing environments.",
        detailsUrl: "https://ppubs.uspto.gov/pubwebapp/search.html?q=17/789012",
        frontPageUrl: undefined,
        isIssued: false,
        isPending: true,
      },
      {
        applicationNumber: "18/345678",
        title: "Enhanced Network Security Protocol - Continuation Application",
        patentNumber: undefined,
        status: "Pending",
        statusCode: 101,
        filingDate: "2023-06-20",
        grantDate: undefined,
        inventors: [
          {
            inventorNameText: "Marco Trinelli",
            firstName: "Marco",
            lastName: "Trinelli",
          },
        ],
        applicants: [
          {
            applicantNameText: "Cisco Technology, Inc.",
            firstName: "Cisco",
            lastName: "Technology, Inc.",
          },
        ],
        abstract:
          "A continuation application of the enhanced network security protocol with additional features and improvements.",
        detailsUrl: "https://ppubs.uspto.gov/pubwebapp/search.html?q=18/345678",
        frontPageUrl: undefined,
        isIssued: false,
        isPending: true,
        isContinuation: true,
      },
    ],
    totalCount: 3,
  };
};

const patentService = {
  fetchPatentsByInventor,
  getFallbackPatentData,
};

export default patentService;
