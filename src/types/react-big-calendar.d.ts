declare module 'react-big-calendar' {
  export interface Event {
    user: {
      _id: string;
      name: string;
    };
    bgColor?: string;
  }
}

export {};
