import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMinistries } from '../services/ministries';
import type { Ministry } from '../types';

const Ministries = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const data = await getMinistries();
        setMinistries(data);
      } catch (error) {
        console.error("Error fetching ministries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMinistries();
  }, []);

  return (
    <div className="pt-44 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 max-w-3xl"
      >
        <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-2 block">Plug In</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Ministries</h1>
        <p className="text-gray-300 text-lg">
          There is a place for everyone at AIC Happy Valley. Find a ministry where you can grow, serve, and connect with others.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-brand-grey h-80 flex items-end"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${ministry.image})` }}
              ></div>
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
              
              {/* Content */}
              <div className="relative z-20 p-8 w-full translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-brand-gold transition-colors">{ministry.name}</h2>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
                  {ministry.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-brand-gold font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 cursor-pointer">
                  <span>Learn More</span>
                  <span className="text-xl leading-none">&rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ministries;
