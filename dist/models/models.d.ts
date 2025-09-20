declare const agency: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        index: boolean;
        required?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        nocase: boolean;
        primary?: undefined;
        prefix?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        prefix?: undefined;
        index?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        primary?: undefined;
        prefix?: undefined;
        index?: undefined;
        required?: undefined;
      }
    | {
        name: string;
        type: string;
        primary?: undefined;
        prefix?: undefined;
        index?: undefined;
        required?: undefined;
        nocase?: undefined;
      }
  )[];
};

declare const areas: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const attributions: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        prefix: boolean;
        primary: boolean;
        required?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix: boolean;
        primary?: undefined;
        required?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        nocase: boolean;
        prefix?: undefined;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        prefix?: undefined;
        primary?: undefined;
        required?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix?: undefined;
        primary?: undefined;
        required?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        prefix?: undefined;
        primary?: undefined;
        required?: undefined;
        min?: undefined;
        max?: undefined;
      }
  )[];
};

declare const bookingRules: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        required?: undefined;
        min?: undefined;
        max?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        max: number;
        primary?: undefined;
        prefix?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        primary?: undefined;
        prefix?: undefined;
        required?: undefined;
        max?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        primary?: undefined;
        prefix?: undefined;
        required?: undefined;
        min?: undefined;
        max?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix: boolean;
        primary?: undefined;
        required?: undefined;
        min?: undefined;
        max?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        primary?: undefined;
        prefix?: undefined;
        required?: undefined;
        min?: undefined;
        max?: undefined;
      }
  )[];
};

declare const calendarDates: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
        index?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
        index?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        max: number;
        index: boolean;
        primary?: undefined;
        prefix?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
        index?: undefined;
      }
  )[];
};

declare const calendar: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        max: number;
        primary?: undefined;
        prefix?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        index: boolean;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
  )[];
};

declare const fareAttributes: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        max: number;
        primary?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix: boolean;
        required?: undefined;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        max?: undefined;
      }
  )[];
};

declare const fareLegRules: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        prefix: boolean;
        primary?: undefined;
        required?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        required?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        prefix?: undefined;
        primary?: undefined;
        required?: undefined;
      }
  )[];
};

declare const fareMedia: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        max: number;
        primary?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const fareProducts: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
      }
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        required?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const fareRules: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
      }
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        required?: undefined;
      }
  )[];
};

declare const fareTransferRules: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
        required?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        primary: boolean;
        prefix?: undefined;
        max?: undefined;
        required?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        primary?: undefined;
        prefix?: undefined;
        required?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        required: boolean;
        primary?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const feedInfo: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        nocase: boolean;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        required?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        nocase?: undefined;
      }
  )[];
};

declare const frequencies: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        primary?: undefined;
        prefix?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const levels: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        prefix: boolean;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        prefix?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const locationGroups: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        primary?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const locationGroupStops: {
  filenameBase: string;
  filenameExtension: string;
  schema: {
    name: string;
    type: string;
    prefix: boolean;
    index: boolean;
    required: boolean;
    primary: boolean;
  }[];
};

declare const locations: {
  filenameBase: string;
  filenameExtension: string;
  schema: {
    name: string;
    type: string;
  }[];
};

declare const networks: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        prefix: boolean;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const pathways: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        prefix: boolean;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        max: number;
        primary?: undefined;
        prefix?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        max?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
  )[];
};

declare const riderCategories: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
  )[];
};

declare const routeNetworks: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        prefix: boolean;
        primary?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        primary: boolean;
        index: boolean;
        prefix: boolean;
        required?: undefined;
      }
  )[];
};

declare const routes: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        prefix: boolean;
        index?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix: boolean;
        index: boolean;
        primary?: undefined;
        required?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        index: boolean;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        index: boolean;
        min: number;
        primary?: undefined;
        prefix?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        index?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        index?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        index?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        index?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix: boolean;
        primary?: undefined;
        required?: undefined;
        index?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        index: boolean;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        nocase?: undefined;
      }
  )[];
};

declare const shapes: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        max: number;
        primary?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        min: number;
        prefix?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        max?: undefined;
      }
  )[];
};

declare const stopAreas: {
  filenameBase: string;
  filenameExtension: string;
  schema: {
    name: string;
    type: string;
    required: boolean;
    primary: boolean;
    prefix: boolean;
  }[];
};

declare const stopTimes: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
        index?: undefined;
        min?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        index?: undefined;
        min?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix: boolean;
        index: boolean;
        required?: undefined;
        primary?: undefined;
        min?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        prefix: boolean;
        index: boolean;
        primary?: undefined;
        min?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        min: number;
        prefix?: undefined;
        index?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        index?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        index?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        index?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
  )[];
};

declare const stops: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        prefix: boolean;
        nocase?: undefined;
        index?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        nocase?: undefined;
        index?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        index: boolean;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        index?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        nocase?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix: boolean;
        primary?: undefined;
        required?: undefined;
        nocase?: undefined;
        index?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        index: boolean;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        prefix: boolean;
        primary?: undefined;
        required?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
  )[];
};

declare const timeframes: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        required?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix?: undefined;
        required?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        index: boolean;
        prefix: boolean;
      }
  )[];
};

declare const transfers: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
        default?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        default: number;
        primary?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        primary?: undefined;
        prefix?: undefined;
        max?: undefined;
        default?: undefined;
      }
  )[];
};

declare const translations: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        required?: undefined;
      }
    | {
        name: string;
        type: string;
        primary: boolean;
        required?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const trips: {
  filenameBase: string;
  filenameExtension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        index: boolean;
        prefix: boolean;
        primary?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        prefix: boolean;
        index?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        required?: undefined;
        index?: undefined;
        prefix?: undefined;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        index: boolean;
        required?: undefined;
        prefix?: undefined;
        primary?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        prefix: boolean;
        required?: undefined;
        primary?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        required?: undefined;
        prefix?: undefined;
        primary?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        required?: undefined;
        index?: undefined;
        prefix?: undefined;
        primary?: undefined;
        nocase?: undefined;
      }
  )[];
};

declare const timetables: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  schema: (
    | {
        name: string;
        type: string;
        prefix: boolean;
        required: boolean;
        primary: boolean;
        min?: undefined;
        max?: undefined;
        nocase?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        prefix?: undefined;
        required?: undefined;
        primary?: undefined;
        nocase?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix?: undefined;
        required?: undefined;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
        nocase?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        max: number;
        prefix?: undefined;
        primary?: undefined;
        nocase?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        prefix?: undefined;
        required?: undefined;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        index: boolean;
        prefix?: undefined;
        required?: undefined;
        primary?: undefined;
        max?: undefined;
        nocase?: undefined;
      }
  )[];
};

declare const timetablePages: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        prefix: boolean;
      }
    | {
        name: string;
        type: string;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const timetableStopOrder: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  schema: (
    | {
        name: string;
        type: string;
        index: boolean;
        prefix: boolean;
        required: boolean;
        primary: boolean;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix: boolean;
        required: boolean;
        primary: boolean;
        index?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        index: boolean;
        required: boolean;
        primary: boolean;
        prefix?: undefined;
      }
  )[];
};

declare const timetableNotes: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        required: boolean;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        primary?: undefined;
        prefix?: undefined;
        required?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        required: boolean;
        primary?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const timetableNotesReferences: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  schema: (
    | {
        name: string;
        type: string;
        prefix: boolean;
        required: boolean;
        primary: boolean;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix: boolean;
        primary: boolean;
        required?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        primary: boolean;
        prefix?: undefined;
        required?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        prefix?: undefined;
        required?: undefined;
        primary?: undefined;
      }
  )[];
};

declare const tripsDatedVehicleJourney: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        index: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        required: boolean;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        index?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        index: boolean;
        required?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const notes: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
      }
  )[];
};

declare const occupancies: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required?: undefined;
        index?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        index: boolean;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        index: boolean;
        primary?: undefined;
        required?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        index: boolean;
        required: boolean;
        primary?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        max: number;
        primary?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        primary?: undefined;
        required?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        index: boolean;
        primary?: undefined;
        required?: undefined;
      }
  )[];
};

declare const vehicleBoardings: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
      }
    | {
        name: string;
        type: string;
        primary: boolean;
        required?: undefined;
      }
  )[];
};

declare const vehicleCategories: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
      }
    | {
        name: string;
        type: string;
        primary?: undefined;
        required?: undefined;
      }
  )[];
};

declare const vehicleCouplings: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
      }
    | {
        name: string;
        type: string;
        primary?: undefined;
        required?: undefined;
      }
  )[];
};

declare const calendarAttributes: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        required?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        nocase: boolean;
        primary?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const directions: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        primary: boolean;
        required?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
  )[];
};

declare const routeAttributes: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
        required?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required: boolean;
        primary?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const stopAttributes: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
      }
  )[];
};

declare const boardAlight: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        index: boolean;
        prefix: boolean;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        index: boolean;
        prefix?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        max: number;
        index: boolean;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        required?: undefined;
        index?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        index?: undefined;
        prefix?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        required?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        index?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
  )[];
};

declare const riderTrip: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        prefix: boolean;
        index?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        prefix: boolean;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        index: boolean;
        primary?: undefined;
        prefix?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        primary?: undefined;
        prefix?: undefined;
        index?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        primary?: undefined;
        prefix?: undefined;
        index?: undefined;
      }
  )[];
};

declare const ridership: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        min: number;
        required: boolean;
        index?: undefined;
        prefix?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        min?: undefined;
        required?: undefined;
        prefix?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min?: undefined;
        required?: undefined;
        index?: undefined;
        prefix?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        prefix: boolean;
        min?: undefined;
        required?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        required?: undefined;
        index?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        index: boolean;
        required?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix: boolean;
        min?: undefined;
        required?: undefined;
        index?: undefined;
        max?: undefined;
      }
  )[];
};

declare const tripCapacity: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        index: boolean;
        prefix: boolean;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        prefix?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        index?: undefined;
        prefix?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        index?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const rideFeedInfo: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        required: boolean;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        min?: undefined;
        max?: undefined;
        required?: undefined;
      }
    | {
        name: string;
        type: string;
        min?: undefined;
        max?: undefined;
        required?: undefined;
        index?: undefined;
      }
  )[];
};

declare const tripUpdates: {
  filenameBase: string;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        index: boolean;
        source: string;
        prefix: boolean;
        default?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        source: string;
        default: null;
        prefix: boolean;
        required?: undefined;
        primary?: undefined;
      }
    | {
        name: string;
        type: string;
        source: string;
        default: null;
        required?: undefined;
        primary?: undefined;
        index?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        index?: undefined;
        source?: undefined;
        prefix?: undefined;
        default?: undefined;
      }
  )[];
};

declare const stopTimeUpdates: {
  filenameBase: string;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        index: boolean;
        source: string;
        default: null;
        prefix: boolean;
        required?: undefined;
      }
    | {
        name: string;
        type: string;
        source: string;
        default: null;
        index?: undefined;
        prefix?: undefined;
        required?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        index?: undefined;
        source?: undefined;
        default?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const vehiclePositions: {
  filenameBase: string;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        index: boolean;
        source: string;
        prefix: boolean;
        default?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        source: string;
        default: null;
        required?: undefined;
        primary?: undefined;
        index?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        source: string;
        default: null;
        required?: undefined;
        primary?: undefined;
        index?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        source: string;
        default: null;
        required?: undefined;
        primary?: undefined;
        index?: undefined;
        prefix?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        source: string;
        default: null;
        prefix: boolean;
        required?: undefined;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        source: string;
        default: null;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        index?: undefined;
        source?: undefined;
        prefix?: undefined;
        default?: undefined;
        min?: undefined;
        max?: undefined;
      }
  )[];
};

declare const serviceAlerts: {
  filenameBase: string;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        index: boolean;
        source: string;
        prefix: boolean;
        default?: undefined;
      }
    | {
        name: string;
        type: string;
        source: string;
        required?: undefined;
        primary?: undefined;
        index?: undefined;
        prefix?: undefined;
        default?: undefined;
      }
    | {
        name: string;
        type: string;
        source: string;
        default: string;
        required?: undefined;
        primary?: undefined;
        index?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        source: string;
        default: string;
        primary?: undefined;
        index?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        index?: undefined;
        source?: undefined;
        prefix?: undefined;
        default?: undefined;
      }
  )[];
};

declare const serviceAlertInformedEntities: {
  filenameBase: string;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        source: string;
        prefix: boolean;
        index?: undefined;
        default?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        source: string;
        default: null;
        prefix: boolean;
        required?: undefined;
        primary?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        source: string;
        default: null;
        required?: undefined;
        primary?: undefined;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        source?: undefined;
        prefix?: undefined;
        index?: undefined;
        default?: undefined;
      }
  )[];
};

declare const deadheadTimes: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        index: boolean;
        primary: boolean;
        prefix: boolean;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        index?: undefined;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix: boolean;
        required?: undefined;
        index?: undefined;
        primary?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        min: number;
        index: boolean;
        prefix?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        index?: undefined;
        primary?: undefined;
        prefix?: undefined;
      }
  )[];
};

declare const deadheads: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        prefix: boolean;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        prefix: boolean;
        primary?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        index: boolean;
        prefix: boolean;
        primary?: undefined;
      }
    | {
        name: string;
        type: string;
        index: boolean;
        prefix: boolean;
        primary?: undefined;
        required?: undefined;
      }
  )[];
};

declare const opsLocations: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        prefix: boolean;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        nocase?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        nocase: boolean;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        max: number;
        primary?: undefined;
        prefix?: undefined;
        nocase?: undefined;
      }
  )[];
};

declare const runEvents: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        prefix: boolean;
        min?: undefined;
        index?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        prefix: boolean;
        primary?: undefined;
        min?: undefined;
        index?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        index: boolean;
        primary?: undefined;
        prefix?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        nocase: boolean;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        min?: undefined;
        index?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        prefix?: undefined;
        min?: undefined;
        index?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        primary?: undefined;
        prefix?: undefined;
        index?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        index: boolean;
        primary?: undefined;
        required?: undefined;
        prefix?: undefined;
        nocase?: undefined;
      }
    | {
        name: string;
        type: string;
        prefix: boolean;
        primary?: undefined;
        required?: undefined;
        min?: undefined;
        index?: undefined;
        nocase?: undefined;
        max?: undefined;
      }
  )[];
};

declare const runsPieces: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        primary: boolean;
        required: boolean;
        min?: undefined;
        max?: undefined;
        index?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        min: number;
        max: number;
        index: boolean;
        primary?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        index: boolean;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        primary?: undefined;
        max?: undefined;
        index?: undefined;
      }
  )[];
};

declare const devices: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
      }
  )[];
};

declare const fareTransactions: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        index: boolean;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        index?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        index?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        index?: undefined;
      }
  )[];
};

declare const operators: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: {
    name: string;
    type: string;
    required: boolean;
    primary: boolean;
  }[];
};

declare const passengerEvents: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        index: boolean;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        index?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        index?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        index?: undefined;
      }
  )[];
};

declare const stationActivities: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        primary?: undefined;
      }
  )[];
};

declare const stopVisits: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required: boolean;
        primary: boolean;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        primary?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
        min?: undefined;
      }
  )[];
};

declare const trainCars: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        primary?: undefined;
      }
  )[];
};

declare const tripsPerformed: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        required?: undefined;
        primary?: undefined;
      }
  )[];
};

declare const vehicleTrainCars: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        primary?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
        min?: undefined;
      }
  )[];
};

declare const vehicleLocations: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        required: boolean;
        primary?: undefined;
        min?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        primary?: undefined;
        max?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        max: number;
        required?: undefined;
        primary?: undefined;
      }
  )[];
};

declare const vehicles: {
  filenameBase: string;
  filenameExtension: string;
  nonstandard: boolean;
  extension: string;
  schema: (
    | {
        name: string;
        type: string;
        required: boolean;
        primary: boolean;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        required?: undefined;
        primary?: undefined;
        min?: undefined;
      }
    | {
        name: string;
        type: string;
        min: number;
        required?: undefined;
        primary?: undefined;
      }
  )[];
};

export {
  agency,
  areas,
  attributions,
  boardAlight,
  bookingRules,
  calendar,
  calendarAttributes,
  calendarDates,
  deadheadTimes,
  deadheads,
  devices,
  directions,
  fareAttributes,
  fareLegRules,
  fareMedia,
  fareProducts,
  fareRules,
  fareTransactions,
  fareTransferRules,
  feedInfo,
  frequencies,
  levels,
  locationGroupStops,
  locationGroups,
  locations,
  networks,
  notes,
  occupancies,
  operators,
  opsLocations,
  passengerEvents,
  pathways,
  rideFeedInfo,
  riderCategories,
  riderTrip,
  ridership,
  routeAttributes,
  routeNetworks,
  routes,
  runEvents,
  runsPieces,
  serviceAlertInformedEntities,
  serviceAlerts,
  shapes,
  stationActivities,
  stopAreas,
  stopAttributes,
  stopTimeUpdates,
  stopTimes,
  stopVisits,
  stops,
  timeframes,
  timetableNotes,
  timetableNotesReferences,
  timetablePages,
  timetableStopOrder,
  timetables,
  trainCars,
  transfers,
  translations,
  tripCapacity,
  tripUpdates,
  trips,
  tripsDatedVehicleJourney,
  tripsPerformed,
  vehicleBoardings,
  vehicleCategories,
  vehicleCouplings,
  vehicleLocations,
  vehiclePositions,
  vehicleTrainCars,
  vehicles,
};
