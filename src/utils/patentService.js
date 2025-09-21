/**
 * Service for fetching patent data from your backend API
 */

/**
 * @typedef {Object} Inventor
 * @property {string} inventorNameText
 * @property {string} [firstName]
 * @property {string} [lastName]
 */

/**
 * @typedef {Object} Applicant
 * @property {string} applicantNameText
 * @property {string} [firstName]
 * @property {string} [lastName]
 */

/**
 * @typedef {Object} Patent
 * @property {string} applicationNumber
 * @property {string} title
 * @property {string} [patentNumber]
 * @property {string} status
 * @property {number} [statusCode]
 * @property {string} [filingDate]
 * @property {string} [grantDate]
 * @property {Inventor[]} inventors
 * @property {Applicant[]} applicants
 * @property {string} [abstract]
 * @property {string} [detailsUrl]
 * @property {string} [frontPageUrl]
 * @property {boolean} isIssued
 * @property {boolean} isPending
 * @property {boolean} [isContinuation]
 */

/**
 * @typedef {Object} PatentApiResponse
 * @property {boolean} success
 * @property {Object} result
 * @property {Patent[]} result.patents
 * @property {number} result.count
 */

/**
 * @typedef {Object} PatentData
 * @property {Patent[]} patents
 * @property {number} totalCount
 */

const BACKEND_API_BASE_URL = 'https://api.marcotrinelli.com/api/patents';

/**
 * Fetches patent data for a specific inventor from your backend service
 * @param {string} inventorName - The name of the inventor to search for
 * @param {number} [limit=100] - Number of results to return
 * @returns {Promise<PatentData>} Patent data response
 */
export const fetchPatentsByInventor = async (inventorName, limit = 100) => {
  try {
    // Construct query parameters
    const queryParams = new URLSearchParams({
      inventorName: inventorName,
      limit: limit.toString()
    });

    const response = await fetch(`${BACKEND_API_BASE_URL}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Backend API request failed: ${response.status} ${response.statusText}`);
    }

    /** @type {PatentApiResponse} */
    const data = await response.json();
    
    // Transform the API response to match our expected format
    return {
      patents: data.result.patents,
      totalCount: data.result.count
    };
  } catch (error) {
    console.error('Error fetching patent data from backend:', error);
    throw error;
  }
};

/**
 * Fallback patent data in case API is unavailable or returns no results
 * This can be updated manually with known patents
 * @returns {PatentData}
 */
export const getFallbackPatentData = () => {
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
            lastName: "Trinelli"
          }
        ],
        applicants: [{ 
          applicantNameText: "Cisco Technology, Inc.",
          firstName: "Cisco",
          lastName: "Technology, Inc."
        }],
        abstract: "A system and method for implementing enhanced network security protocols in distributed computing environments.",
        detailsUrl: "https://patents.uspto.gov/patent/11234567",
        frontPageUrl: "https://pdfpiw.uspto.gov/.piw?PageNum=0&docid=11234567",
        isIssued: true,
        isPending: false
      },
      {
        applicationNumber: "17/789012",
        title: "AI-Powered Edge Computing Optimization Framework",
        patentNumber: null,
        status: "Non Final Action Mailed",
        statusCode: 103,
        filingDate: "2021-11-08",
        grantDate: null,
        inventors: [
          { 
            inventorNameText: "Marco Trinelli",
            firstName: "Marco",
            lastName: "Trinelli"
          }
        ],
        applicants: [{ 
          applicantNameText: "Cisco Technology, Inc.",
          firstName: "Cisco",
          lastName: "Technology, Inc."
        }],
        abstract: "An artificial intelligence framework for optimizing resource allocation in edge computing environments.",
        detailsUrl: "https://ppubs.uspto.gov/pubwebapp/search.html?q=17/789012",
        frontPageUrl: null,
        isIssued: false,
        isPending: true
      },
      {
        applicationNumber: "18/345678",
        title: "Enhanced Network Security Protocol - Continuation Application",
        patentNumber: null,
        status: "Pending",
        statusCode: 101,
        filingDate: "2023-06-20",
        grantDate: null,
        inventors: [
          { 
            inventorNameText: "Marco Trinelli",
            firstName: "Marco",
            lastName: "Trinelli"
          }
        ],
        applicants: [{ 
          applicantNameText: "Cisco Technology, Inc.",
          firstName: "Cisco",
          lastName: "Technology, Inc."
        }],
        abstract: "A continuation application of the enhanced network security protocol with additional features and improvements.",
        detailsUrl: "https://ppubs.uspto.gov/pubwebapp/search.html?q=18/345678",
        frontPageUrl: null,
        isIssued: false,
        isPending: true,
        isContinuation: true
      }
    ],
    totalCount: 3
  };
};

const patentService = {
  fetchPatentsByInventor
};

export default patentService;