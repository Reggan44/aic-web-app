import { motion } from 'framer-motion';
import { GlowCard } from '../components/ui/spotlight-card';
import DownloadButton from '../components/DownloadButton';

const Gallery = () => {
  const images = [
    '/bishop.jpeg',
    '/cadet.jpg',
    '/drone .jpeg',
    '/logo.png',
    '/WhatsApp Image 2026-02-03 at 11.09.30 PM.jpeg',
    '/WhatsApp Image 2026-02-03 at 11.17.40 PM.jpeg',
    '/WhatsApp Image 2026-02-03 at 11.17.41 PM.jpeg',
    '/WhatsApp Image 2026-02-03 at 11.20.13 PM.jpeg',
    '/WhatsApp Image 2026-02-03 at 11.20.14 PM (1).jpeg',
    '/WhatsApp Image 2026-02-03 at 11.20.14 PM (2).jpeg',
    '/WhatsApp Image 2026-02-03 at 11.20.14 PM.jpeg',
    '/WhatsApp Image 2026-02-03 at 11.20.15 PM (1).jpeg',
    '/WhatsApp Image 2026-02-03 at 11.20.15 PM (2).jpeg',
    '/WhatsApp Image 2026-02-03 at 2.08.37 PM.jpeg',
    '/WhatsApp Image 2026-02-08 at 1.01.16 PM (1).jpeg',
    '/WhatsApp Image 2026-02-08 at 11.39.47 AM.jpeg',
    '/WhatsApp Image 2026-02-08 at 11.40.00 AM.jpeg',
    '/WhatsApp Image 2026-02-08 at 4.09.26 PM.jpeg',
    '/WhatsApp Image 2026-02-08 at 4.09.28 PM.jpeg',
    '/WhatsApp Image 2026-02-08 at 4.09.47 PM.jpeg',
    '/WhatsApp Image 2026-02-08 at 4.09.49 PM.jpeg',
    '/WhatsApp Image 2026-02-08 at 4.09.50 PM.jpeg',
    '/WhatsApp Image 2026-02-15 at 10.05.58 PM.jpeg',
    '/WhatsApp Image 2026-02-15 at 10.06.29 PM.jpeg',
    '/Black Beige Bold Scrapbook Photo Collage Friends Moment Instagram Post.png',
  ];

  return (
    <div className="pt-44 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-brand-darkGrey">Gallery</h1>
        <p className="text-lg md:text-xl text-brand-darkGrey max-w-3xl mx-auto">
          Moments and memories from our church family. A peaceful and calming space to reflect on God's goodness.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <GlowCard 
              glowColor="green" 
              size="md" 
              customSize={true} 
              className="w-full h-64 p-0 group"
            >
              <div className="w-full h-full overflow-hidden rounded-2xl relative">
                <img
                  src={image}
                  alt={`Church moment ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <DownloadButton
                    title={`Church moment ${index + 1}`}
                    url={image}
                    type="image"
                    className="w-full justify-center"
                  />
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;