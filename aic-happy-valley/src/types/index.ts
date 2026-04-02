export interface Sermon {
  id?: string;
  title: string;
  date: string;
  videoUrl: string;
  description: string;
  category: string;
}

export interface EventItem {
  id?: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export interface Ministry {
  id?: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  images?: string[];
  activities: string[];
  meetingTime: string;
  leader: string;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: any;
}

export interface Leader {
  id?: string;
  name: string;
  role: string;
  tagline: string;
  image: string;
  bio: string;
  verse: {
    text: string;
    reference: string;
  };
  highlights: string[];
}
