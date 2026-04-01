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
  description: string;
  image: string;
}
