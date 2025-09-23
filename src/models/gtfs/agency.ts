export const agency = {
  filenameBase: 'agency',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'agency_id',
      type: 'text',
      primary: true,
      prefix: true,
      index: true,
    },
    {
      name: 'agency_name',
      type: 'text',
      required: true,
      nocase: true,
      index: true,
    },
    {
      name: 'agency_url',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'agency_timezone',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'agency_lang',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'agency_phone',
      type: 'text',
      nocase: true,
      index: true,
    },
    {
      name: 'agency_fare_url',
      type: 'text',
      index: true,
    },
    {
      name: 'agency_email',
      type: 'text',
      nocase: true,
      index: true,
    },
  ],
};
