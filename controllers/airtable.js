import { base } from "@/libs/airtable";

const VIEW = "Grid view";

// maps over the records, calling minifyRecord, giving us required data
export const getMinifiedRecords = (records) => {
  if (!Array.isArray(records)) return minifyRecord(records);
  return records.map((record) => minifyRecord(record));
};

// gets the data we want and puts it into variables
export const minifyRecord = (record) => {
  return {
    id: record?.id,
    fields: record?.fields,
  };
};

export const getRecords = async (
  table,
  filterByFormula = "",
  view = VIEW,
  ...rest
) => {
  const records = await base(table)
    .select({ view, filterByFormula, ...rest })
    .all();

  return getMinifiedRecords(records);
};

export const getRecordById = async (table, id) => {
  const record = await base(table).find(id);
  return minifyRecord(record);
};

export const getAllPaths = async (table = "pages", ...rest) => {
  const pages = await getRecords(table, ...rest);
  return pages.map((page) => ({
    params: {
      page: page?.fields?.title || "", // @HACK: conditionally set to empty string -- see note below
    },

    // NOTE: if an airtable page row is left empty the value for title would be undefined. to mitigate that we've conditionally set the value to an empty string so the build won't fail.
    // -- Solution: LEAVE NO empty rows in airtables
  }));
};

export const getRelatedRecords = async (table, ids = []) => {
  // @link: https://zellwk.com/blog/async-await-in-loops/
  // @link: https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
  const records = await ids.map(async (id) => {
    const record = await getRecordById(table, id);
    return record;
  });

  return Promise.all(records);
};

export const getPage = async (title) => {
  const filterByFormula = `AND(title='${title}')`;
  const page = await getRecords("pages", filterByFormula);
  const minified = getMinifiedRecords(page);
  return minified;
};

export const getPageById = async (id) => {
  if (!id) console.error("please provide an pageId");
  const table = "pages";
  const record = await getRecordById(table, id);
  const sections = await getRelatedRecords(table, record.fields.sectionId);
  record.sections = await Promise.all(
    await sections.map(async (section) => {
      if (section?.fields?.cardId?.length) {
        const cards = await getRelatedRecords("cards", section.fields.cardId);
        section.cards = cards;
      }
      if (section?.fields?.mediaId?.length) {
        const media = await getRelatedRecords("media", section.fields.mediaId);
        section.media = media;
      }
      return section;
    })
  );
  return record;
};

export const getComponent = async (title) => {
  const filterByFormula = `AND(title='${title}')`;
  const component = await getRecords("component", filterByFormula);

  const minified = getMinifiedRecords(component);
  const [miniComponent] = minified;

  if (miniComponent?.fields?.mediaId?.length) {
    const media = await getRelatedRecords(
      "media",
      miniComponent?.fields?.mediaId
    );
    miniComponent.media = media;
  }

  if (miniComponent?.fields?.faqId?.length) {
    const faqs = await getRelatedRecords("faqs", miniComponent?.fields?.faqId);
    miniComponent.faqs = faqs;
  }
  return miniComponent;
};
