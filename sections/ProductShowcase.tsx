'use client';
import Image from 'next/image';
import consultingImage from '@/assets/Company.png';
import strategyIcon from '@/assets/strategy.png';
import growthIcon from '@/assets/growth.png';
import innovationIcon from '@/assets/innovation.png';
import supportIcon from '@/assets/support.png';
import ArrowIcon from '@/assets/arrow-right.svg';
import { motion } from 'framer-motion';

const Services = [
  {
    icon: strategyIcon,
    title: 'Strategic Consulting',
    description: 'Define and implement winning strategies tailored to your business goals and market position.',
  },
  {
    icon: growthIcon,
    title: 'Business Growth',
    description: 'Accelerate success with data-driven insights and proven expansion methodologies.',
  },
  {
    icon: innovationIcon,
    title: 'Innovative Solutions',
    description: 'Leverage cutting-edge methodologies to stay ahead of industry trends.',
  },
  {
    icon: supportIcon,
    title: 'Ongoing Support',
    description: 'Continuous guidance and optimization for sustainable long-term success.',
  },
];

export const ProductShowcase = () => {
  return (
    <section className="bg-white py-20 px-5 md:px-12">
      <div className="container mx-auto">
        {/* Mission + Image Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* Mission Text */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-3xl font-bold text-blue-900 mb-2">EPBS CONSULTING</h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
            </motion.div>
            
            <motion.h3
              className="text-2xl font-semibold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our Mission: Your Success
            </motion.h3>
            
            <motion.p
              className="text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We are a team of experts passionate about prospecting, customer acquisition,
              customer relationship management, and marketing research. With many years of 
              experience, we help businesses grow their customer base, optimize marketing 
              campaigns, and strengthen customer relationships through tailor-made solutions.
            </motion.p>
          </div>

          {/* Company Image */}
          <motion.div
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-blue-100 rounded-2xl rotate-6"></div>
              <div className="relative rounded-2xl overflow-hidden border-8 border-white shadow-xl h-full w-full">
                <Image 
                  src={consultingImage} 
                  alt="EPBS Consulting Team" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-700/10"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services Header */}
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Business Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tailored strategies that drive measurable results and sustainable growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Image src={service.icon} alt="" width={28} height={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {service.description}
              </p>
              <button className="text-blue-600 font-medium flex items-center gap-1 text-sm">
                Learn more <ArrowIcon className="w-4 h-4 mt-0.5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Floating decorative elements */}
        <motion.div 
          className="absolute left-0 bottom-0 w-40 h-40 rounded-full bg-blue-100 blur-3xl opacity-30 -z-10"
          animate={{
            x: [0, 20, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
          }}
        />
      </div>
    </section>
  );
};