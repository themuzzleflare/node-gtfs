export const levels = {
  filenameBase: 'levels',
  filenameExtension: 'txt',
  schema: [
    {
      name: 'level_id',
      type: 'text',
      primary: true,
      required: true,
      prefix: true,
      index: true,
    },
    {
      name: 'level_index',
      type: 'real',
      required: true,
      index: true,
    },
    {
      name: 'level_name',
      type: 'text',
      nocase: true,
      index: true,
    },
  ],
};
