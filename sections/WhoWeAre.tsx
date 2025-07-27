'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section className="bg-white py-16 px-5 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-screen-xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left - Text */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <p className="uppercase text-sm text-[#0f35f5] font-semibold mb-2">Qui sommes-nous</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#001a72] mb-4">Une équipe d’experts passionnés</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Chez EPBS Consulting, notre équipe est composée de spécialistes en stratégie, finance, et innovation. Nous sommes là pour propulser vos projets au niveau supérieur, avec une approche humaine et personnalisée.
          </p>
        </motion.div>

        {/* Right - Photos */}
        <motion.div
          className="w-full lg:w-1/2 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="col-span-2">
            <Image
              src="/images/fondateur.jpg" // Remplace avec ton image réelle
              alt="Fondateur EPBS"
              width={600}
              height={400}
              className="rounded-xl w-full object-cover"
            />
            <p className="mt-2 text-sm text-center font-medium text-[#001a72]">Jean Dupont – Fondateur</p>
          </div>
          <div>
            <Image
              src="/images/expert1.jpg"
              alt="Expert 1"
              width={300}
              height={200}
              className="rounded-lg w-full object-cover"
            />
            <p className="mt-2 text-sm text-center text-[#0025b5]">Sophie Martin</p>
          </div>
          <div>
            <Image
              src="/images/expert2.jpg"
              alt="Expert 2"
              width={300}
              height={200}
              className="rounded-lg w-full object-cover"
            />
            <p className="mt-2 text-sm text-center text-[#0025b5]">Youssef Benali</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
