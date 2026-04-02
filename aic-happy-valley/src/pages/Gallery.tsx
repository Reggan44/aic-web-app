import { motion } from 'framer-motion';
import { GlowCard } from '../components/ui/spotlight-card';
import DownloadButton from '../components/DownloadButton';

const Gallery = () => {
  const images = [
    '/bishop.jpeg',
    '/cadet.jpg',
    '/church-drone-view.jpeg',
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
    <div className="pt-24 md:pt-32 pb-20 px-4 xs:px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 md:mb-16 text-center"
      >
        <h1 className="text-3xl xs:text-4xl md:text-6xl font-black mb-6 text-brand-darkGrey tracking-tight">Gallery</h1>
        <p className="text-base xs:text-xl text-brand-darkGrey/60 max-w-3xl mx-auto leading-relaxed font-medium">
          Moments and memories from our church family. A peaceful and calming space to reflect on God's goodness.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-6"
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <GlowCard 
              glowColor="green" 
              size="md" 
              customSize={true} 
              className="w-full h-64 p-0 group overflow-hidden rounded-[1.5rem] xs:rounded-[2rem] border border-brand-sage/10 shadow-xl"
            >
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={image}
                  alt={`Church moment ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 md:opacity-0 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <DownloadButton
                    title={`Church moment ${index + 1}`}
                    url={image}
                    type="image"
                    className="w-full justify-center bg-brand-sage text-brand-darkGrey font-black py-3 rounded-xl shadow-lg active:scale-95 transition-transform"
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