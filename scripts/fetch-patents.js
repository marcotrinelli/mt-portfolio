// Refreshes the patents snapshot used for the home page facts and as the
// patents page fallback when the live API is unreachable
const fs = require("fs");
const path = require("path");

const API_URL =
  "https://api.marcotrinelli.com/api/patents?inventorName=Marco%20Trinelli&limit=100";
const OUT_FILE = path.join(__dirname, "../src/data/patents.json");

// Only what the cards render (the API also returns inventor home addresses)
const KEPT_FIELDS = [
  "title",
  "applicationNumber",
  "patentNumber",
  "publicationNumber",
  "status",
  "filingDate",
  "grantDate",
  "publicationDate",
  "detailsUrl",
  "isIssued",
  "isPending",
  "isContinuation",
  "applicationType",
  "cpcCodes",
];

const toName = ({ inventorNameText, applicantNameText }) => ({
  ...(inventorNameText && { inventorNameText }),
  ...(applicantNameText && { applicantNameText }),
});

async function main() {
  const res = await fetch(API_URL, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Patents API returned ${res.status} ${res.statusText}`);
  }
  const { result } = await res.json();
  if (!result.patents.length) {
    throw new Error(
      "Patents API returned no patents, keeping the old snapshot"
    );
  }

  const patents = result.patents.map((p) => ({
    ...Object.fromEntries(
      KEPT_FIELDS.filter((k) => p[k] != null).map((k) => [k, p[k]])
    ),
    inventors: p.inventors.map(toName),
    applicants: p.applicants.map(toName),
  }));

  const snapshot = {
    fetchedAt: new Date().toISOString().slice(0, 10),
    patents,
  };
  fs.writeFileSync(OUT_FILE, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(`Wrote ${patents.length} patents to ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
