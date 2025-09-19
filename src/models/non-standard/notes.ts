/*
 * Copyright © 2025 Paul Tavitian.
 */

export const notes = {
  filenameBase: 'notes',
  filenameExtension: 'txt',
  nonstandard: true,
  schema: [
    {
      name: 'note_id',
      type: 'text',
      primary: true,
      required: true,
    },
    {
      name: 'note_text',
      type: 'text',
      required: true,
    },
  ],
};
