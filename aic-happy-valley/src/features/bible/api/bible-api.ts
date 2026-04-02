export interface BibleVerse {
  pk: number;
  translation: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleBook {
  bookid: number;
  name: string;
  chapters: number;
}

const BASE_URL = 'https://bolls.life';

export const fetchBooks = async (translation: 'KJV' | 'SUV'): Promise<BibleBook[]> => {
  const response = await fetch(`${BASE_URL}/get-books/${translation}/`);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
};

export const fetchChapter = async (
  translation: 'KJV' | 'SUV',
  bookId: number,
  chapter: number
): Promise<BibleVerse[]> => {
  const response = await fetch(`${BASE_URL}/get-text/${translation}/${bookId}/${chapter}/`);
  if (!response.ok) throw new Error('Failed to fetch chapter');
  return response.json();
};

// Book names for display mapping
export const bibleBooks = [
  { id: 1, name: 'Genesis', swahili: 'Mwanzo' },
  { id: 2, name: 'Exodus', swahili: 'Kutoka' },
  { id: 3, name: 'Leviticus', swahili: 'Walawi' },
  { id: 4, name: 'Numbers', swahili: 'Hesabu' },
  { id: 5, name: 'Deuteronomy', swahili: 'Kumbukumbu la Torati' },
  { id: 6, name: 'Joshua', swahili: 'Yoshua' },
  { id: 7, name: 'Judges', swahili: 'Waamuzi' },
  { id: 8, name: 'Ruth', swahili: 'Ruthi' },
  { id: 9, name: '1 Samuel', swahili: '1 Samweli' },
  { id: 10, name: '2 Samuel', swahili: '2 Samweli' },
  { id: 11, name: '1 Kings', swahili: '1 Wafalme' },
  { id: 12, name: '2 Kings', swahili: '2 Wafalme' },
  { id: 13, name: '1 Chronicles', swahili: '1 Mambo ya Nyakati' },
  { id: 14, name: '2 Chronicles', swahili: '2 Mambo ya Nyakati' },
  { id: 15, name: 'Ezra', swahili: 'Ezra' },
  { id: 16, name: 'Nehemiah', swahili: 'Nehemia' },
  { id: 17, name: 'Esther', swahili: 'Esta' },
  { id: 18, name: 'Job', swahili: 'Ayubu' },
  { id: 19, name: 'Psalms', swahili: 'Zaburi' },
  { id: 20, name: 'Proverbs', swahili: 'Mithali' },
  { id: 21, name: 'Ecclesiastes', swahili: 'Mhubiri' },
  { id: 22, name: 'Song of Solomon', swahili: 'Wimbo Ulio Bora' },
  { id: 23, name: 'Isaiah', swahili: 'Isaya' },
  { id: 24, name: 'Jeremiah', swahili: 'Yeremia' },
  { id: 25, name: 'Lamentations', swahili: 'Maombolezo' },
  { id: 26, name: 'Ezekiel', swahili: 'Ezekieli' },
  { id: 27, name: 'Daniel', swahili: 'Danieli' },
  { id: 28, name: 'Hosea', swahili: 'Hosea' },
  { id: 29, name: 'Joel', swahili: 'Yoeli' },
  { id: 30, name: 'Amos', swahili: 'Amosi' },
  { id: 31, name: 'Obadiah', swahili: 'Obadia' },
  { id: 32, name: 'Jonah', swahili: 'Yona' },
  { id: 33, name: 'Micah', swahili: 'Mika' },
  { id: 34, name: 'Nahum', swahili: 'Nahumu' },
  { id: 35, name: 'Habakkuk', swahili: 'Habakuki' },
  { id: 36, name: 'Zephaniah', swahili: 'Sefania' },
  { id: 37, name: 'Haggai', swahili: 'Hagai' },
  { id: 38, name: 'Zechariah', swahili: 'Zekaria' },
  { id: 39, name: 'Malachi', swahili: 'Malaki' },
  { id: 40, name: 'Matthew', swahili: 'Mathayo' },
  { id: 41, name: 'Mark', swahili: 'Marko' },
  { id: 42, name: 'Luke', swahili: 'Luka' },
  { id: 43, name: 'John', swahili: 'Yohana' },
  { id: 44, name: 'Acts', swahili: 'Matendo ya Mitume' },
  { id: 45, name: 'Romans', swahili: 'Warumi' },
  { id: 46, name: '1 Corinthians', swahili: '1 Wakorintho' },
  { id: 47, name: '2 Corinthians', swahili: '2 Wakorintho' },
  { id: 48, name: 'Galatians', swahili: 'Wagalatia' },
  { id: 49, name: 'Ephesians', swahili: 'Waefeso' },
  { id: 50, name: 'Philippians', swahili: 'Wafilipi' },
  { id: 51, name: 'Colossians', swahili: 'Wakolosai' },
  { id: 52, name: '1 Thessalonians', swahili: '1 Wathesalonike' },
  { id: 53, name: '2 Thessalonians', swahili: '2 Wathesalonike' },
  { id: 54, name: '1 Timothy', swahili: '1 Timotheo' },
  { id: 55, name: '2 Timothy', swahili: '2 Timotheo' },
  { id: 56, name: 'Titus', swahili: 'Tito' },
  { id: 57, name: 'Philemon', swahili: 'Filemoni' },
  { id: 58, name: 'Hebrews', swahili: 'Waebrania' },
  { id: 59, name: 'James', swahili: 'Yakobo' },
  { id: 60, name: '1 Peter', swahili: '1 Petro' },
  { id: 61, name: '2 Peter', swahili: '2 Petro' },
  { id: 62, name: '1 John', swahili: '1 Yohana' },
  { id: 63, name: '2 John', swahili: '2 Yohana' },
  { id: 64, name: '3 John', swahili: '3 Yohana' },
  { id: 65, name: 'Jude', swahili: 'Yuda' },
  { id: 66, name: 'Revelation', swahili: 'Ufunuo' }
];
