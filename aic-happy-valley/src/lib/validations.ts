import { z } from 'zod';

// Sermon Validation
export const sermonSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  date: z.string().min(1, 'Date is required'),
  videoUrl: z.string().url('Invalid YouTube URL').refine(
    (url) => url.includes('youtube.com') || url.includes('youtu.be'),
    'Only YouTube links are supported'
  ),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  category: z.string().optional(),
});

// Event Validation
export const eventSchema = z.object({
  title: z.string().min(3, 'Event title must be at least 3 characters').max(100),
  date: z.string().min(1, 'Date and time are required'),
  location: z.string().min(3, 'Location is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
});

// Contact Message Validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

// Broadcast Notification Validation
export const notificationSchema = z.object({
  title: z.string().min(3, 'Notification title must be at least 3 characters').max(50),
  body: z.string().min(5, 'Notification message must be at least 5 characters').max(200),
});

// Ministry Validation
export const ministrySchema = z.object({
  name: z.string().min(3, 'Ministry name must be at least 3 characters').max(100),
  tagline: z.string().min(5, 'Tagline must be at least 5 characters').max(100),
  image: z.string().min(1, 'Image path is required'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  meetingTime: z.string().min(3, 'Meeting time is required').max(100),
  leader: z.string().min(3, 'Leader/Contact is required').max(100),
  activities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

// Leader Validation
export const leaderSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100),
  role: z.string().min(3, 'Role must be at least 3 characters').max(100),
  tagline: z.string().min(5, 'Tagline must be at least 5 characters').max(100),
  image: z.string().min(1, 'Photo URL is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters').max(2000),
  highlights: z.array(z.string()).optional(),
  verse: z.object({
    text: z.string().optional(),
    reference: z.string().optional(),
  }).optional(),
});

export type SermonInput = z.infer<typeof sermonSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type NotificationInput = z.infer<typeof notificationSchema>;
export type MinistryInput = z.infer<typeof ministrySchema>;
export type LeaderInput = z.infer<typeof leaderSchema>;
