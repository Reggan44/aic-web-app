import { Ministry, Leader } from '../types';

export const ministrySeedData: Ministry[] = [
  {
    id: 'choir',
    name: 'Choir & Music Ministry',
    tagline: 'Lifting voices in praise',
    description: "Our Choir Ministry leads the congregation in spirit-filled worship every Sunday. We believe that praise and worship create an atmosphere for God to move mightily and transform lives.",
    meetingTime: 'Wednesdays at 5:30 PM & Sundays at 8:00 AM',
    leader: 'Music Director',
    image: '/choir.jpeg',
    gallery: ['/choir-1.jpeg'],
    iconName: 'Music',
    color: 'bg-brand-sage',
    textColor: 'text-brand-sage',
    order: 1
  },
  {
    id: 'youth',
    name: 'Youth Ministry',
    tagline: 'A generation on fire for God',
    description: 'A dynamic generation on fire for God. We empower young people to stand strong in their faith, discover their purpose, and make a positive impact through discipleship and community.',
    meetingTime: 'Saturdays at 4:30 PM',
    leader: 'Youth Pastor',
    image: '/youth.jpeg',
    gallery: ['/youth-1.jpeg', '/youth-activities.jpeg'],
    iconName: 'Shield',
    color: 'bg-brand-sky',
    textColor: 'text-brand-sky',
    order: 2
  },
  {
    id: 'women',
    name: 'Women\'s Ministry',
    tagline: 'Empowered women, transformed homes',
    description: 'Empowered women, transformed homes. A vibrant community of ladies growing deeper in faith, sisterhood, and mentorship while serving the church with love.',
    meetingTime: '2nd & 4th Saturdays at 2:30 PM',
    leader: 'Chairlady',
    image: '/women.jpeg',
    gallery: ['/women-1.jpeg'],
    iconName: 'Heart',
    color: 'bg-rose-500',
    textColor: 'text-rose-500',
    order: 3
  },
  {
    id: 'men',
    name: 'Men\'s Fellowship',
    tagline: 'Iron sharpening iron',
    description: 'Iron sharpening iron. A brotherhood of men committed to excellence in faith, family, and leadership. We equip men to lead with integrity and courage.',
    meetingTime: 'Monthly Breakast (Check Calendar)',
    leader: 'Chairman',
    image: '/men.jpeg',
    gallery: ['/men-1.jpeg', '/men-2.jpeg'],
    iconName: 'Users',
    color: 'bg-brand-gold',
    textColor: 'text-brand-gold',
    order: 4
  },
  {
    id: 'children-nextgen',
    name: 'Children & NextGen (Sunday School)',
    tagline: 'Raising Godly children for a transformed generation',
    description: 'NextGen is our comprehensive children\'s ministry (ages 0–12) dedicated to spiritual development. We provide a safe, fun, and spiritually enriching environment where our youngest members lay the foundation to know and love Jesus.',
    activities: ['Bible storytelling', 'Verse memorization', 'Kids\' worship nights', 'Vacation Bible school'],
    meetingTime: 'Sundays at 9:00 AM & 10:30 AM',
    leader: 'Sunday School Superintendent',
    image: '/sunday-school.jpeg',
    gallery: ['/sunday-school-kids.jpeg', '/sunday-school.jpeg'],
    iconName: 'BookOpen',
    color: 'bg-brand-sage',
    textColor: 'text-brand-sage',
    order: 5
  },
  {
    id: 'cadets',
    name: 'Cadets Ministry',
    tagline: 'Discipline, devotion, and dedication',
    description: 'Discipline, devotion, and dedication. Instilling leadership and character through military-inspired training and a deep love for God.',
    meetingTime: 'Sundays after Service',
    leader: 'Head Cadet',
    image: '/cadets.jpg',
    gallery: [],
    iconName: 'Award',
    color: 'bg-brand-grey',
    textColor: 'text-brand-grey',
    order: 6
  }
];

export const leaderSeedData: Leader[] = [
  {
    name: 'Rev. Samuel M.',
    role: 'Senior Pastor',
    image: '/pastor-sam.jpeg',
    bio: 'Serving at AIC Happy Valley with a passion for teaching the word and pastoral care.',
    responsibilities: ['General Oversight', 'Teaching', 'Pastoral Counseling'],
    order: 1
  },
  {
    name: 'Rev. Miriam W.',
    role: 'Associate Pastor',
    image: '/pastor Miriam.jpeg',
    bio: 'Dedicated to community outreach and leadership development within the church.',
    responsibilities: ['Outreach', 'Leadership Training', 'Family Ministry'],
    order: 2
  }
];
