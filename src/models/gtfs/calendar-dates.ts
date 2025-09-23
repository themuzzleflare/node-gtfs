export const calendarDates = {
  filenameBase: 'calendar_dates',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'service_id',
      type: 'text',
      required: true,
      primary: true,
      prefix: true,
      index: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      primary: true,
      index: true,
    },
    {
      name: 'exception_type',
      type: 'integer',
      required: true,
      min: 1,
      max: 2,
      index: true,
    },
    {
      name: 'holiday_name',
      type: 'text',
      nocase: true,
      index: true,
    },
  ],
};
