"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Pricing() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="pricing"
      className="w-full py-section-gap px-margin-mobile lg:px-margin-desktop bg-surface border-t border-outline-variant/10"
    >
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-section-gap">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-display-lg text-[40px] font-semibold mb-4"
          >
            Transparent Pricing.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body-md text-on-surface-variant max-w-xl mx-auto"
          >
            Simple, usage-based plans designed for individual developers and
            high-performance teams.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Community Plan */}
          <motion.div
            variants={item}
            className="border border-outline-variant/20 bg-surface-container p-8 flex flex-col rounded-xl hover:border-outline-variant/40 transition-colors"
          >
            <div className="font-mono-label text-outline uppercase tracking-widest mb-2">
              Community
            </div>
            <div className="font-display-lg text-[48px] mb-6">
              $0
              <span className="text-[18px] text-outline font-body-md font-normal">
                /mo
              </span>
            </div>
            <ul className="flex flex-col gap-4 font-body-md text-on-surface-variant mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-outline-variant rounded-full" />
                Basic syntax highlighting
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-outline-variant rounded-full" />
                50 AI queries per day
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-outline-variant rounded-full" />
                Public repositories only
              </li>
            </ul>
            <Link href="/signup">
              <button className="w-full border border-outline-variant hover:bg-surface-container-low text-on-surface py-3 rounded-lg font-mono-label transition-colors">
                Start Free
              </button>
            </Link>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            variants={item}
            className="border border-primary bg-surface-container p-8 flex flex-col relative rounded-xl shadow-lg shadow-primary/10"
          >
            <div className="absolute top-0 right-0 bg-primary text-on-primary font-mono-label text-[10px] px-3 py-1 rounded-bl-lg rounded-tr-xl">
              RECOMMENDED
            </div>
            <div className="font-mono-label text-primary uppercase tracking-widest mb-2">
              Pro
            </div>
            <div className="font-display-lg text-[48px] mb-6">
              $20
              <span className="text-[18px] text-outline font-body-md font-normal">
                /mo
              </span>
            </div>
            <ul className="flex flex-col gap-4 font-body-md text-on-surface-variant mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Advanced AI debugging
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Unlimited AI queries
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Private workspace
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Cloud compute instances
              </li>
            </ul>
            <Link href="/signup?redirect=/payment">
              <button className="w-full bg-primary hover:bg-primary/90 text-on-primary py-3 rounded-lg font-mono-label transition-colors">
                Upgrade to Pro
              </button>
            </Link>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            variants={item}
            className="border border-outline-variant/20 bg-surface-container p-8 flex flex-col rounded-xl hover:border-outline-variant/40 transition-colors"
          >
            <div className="font-mono-label text-outline uppercase tracking-widest mb-2">
              Enterprise
            </div>
            <div className="font-display-lg text-[48px] mb-6">Custom</div>
            <ul className="flex flex-col gap-4 font-body-md text-on-surface-variant mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-outline-variant rounded-full" />
                Custom LLM fine-tuning
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-outline-variant rounded-full" />
                SSO & advanced security
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-outline-variant rounded-full" />
                Dedicated support
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-outline-variant rounded-full" />
                On-premise deployment
              </li>
            </ul>
            <Link href="/contact-sales">
              <button className="w-full border border-outline-variant hover:bg-surface-container-low text-on-surface py-3 rounded-lg font-mono-label transition-colors">
                Contact Sales
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
