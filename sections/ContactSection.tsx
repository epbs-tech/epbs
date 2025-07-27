'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ContactBar() {
  return (
    <section className="bg-[#0025b5] px-6 py-12 lg:py-16  m-5 sm:m-6 md:m-8 lg:m-10 p-5 sm:p-6 md:p-8 lg:p-10">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
        <div>
          <p className="uppercase text-sm font-semibold text-[#003B3B] mb-2">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[white] tracking-tight">
            Une question ? Un projet ?
          </h2>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/contact">
            <button className="bg-[#F9D54C] text-[#003B3B] font-medium px-6 py-3 shadow-md hover:shadow-lg transition-all">
              Nous écrire &nbsp;!
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
