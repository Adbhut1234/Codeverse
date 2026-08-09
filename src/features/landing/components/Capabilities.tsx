"use client";

import { motion } from "framer-motion";
import { Brain, Bug, Zap, TestTube } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="w-full py-section-gap px-margin-mobile lg:px-margin-desktop border-t border-outline-variant/10 bg-surface"
    >
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-section-gap">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
            className="max-w-xl"
          >
            <div className="font-mono-label text-primary mb-4 uppercase tracking-widest">
              Capabilities
            </div>
            <h2 className="font-display-lg text-[40px] leading-tight font-semibold">
              Engineered for absolute control and speed.
            </h2>
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={1}
            className="font-body-md text-on-surface-variant max-w-sm mt-6 md:mt-0"
          >
            Every tool you need to write, refactor, and ship code faster,
            deeply integrated into a single unified workspace.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Card 1: Understand Complex Systems */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
            className="md:col-span-8 group bg-surface-container border border-outline-variant/20 p-8 flex flex-col relative overflow-hidden h-[400px] rounded-lg hover:border-outline-variant/40 transition-colors"
          >
            <div className="relative z-10 flex flex-col h-full">
              <Brain size={32} className="text-primary mb-6" />
              <h3 className="font-headline-md text-[24px] mb-2">
                Understand Complex Systems
              </h3>
              <p className="font-body-md text-on-surface-variant max-w-md">
                Highlight any block of code, from legacy C++ to modern Rust,
                and instantly get a deep, semantic explanation of its logic,
                dependencies, and potential edge cases.
              </p>
              <div className="mt-auto font-mono-code text-[13px] text-outline p-4 bg-surface rounded border border-outline-variant/20 self-start">
                <span className="text-primary">$</span> cv explain
                src/core/engine.rs:42-108
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-gradient-to-tl from-primary/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Card 2: Intelligent Debugging */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={1}
            className="md:col-span-4 bg-surface-container border border-outline-variant/20 p-8 flex flex-col h-[400px] rounded-lg hover:border-outline-variant/40 transition-colors"
          >
            <Bug size={32} className="text-primary mb-6" />
            <h3 className="font-headline-md text-[24px] mb-2">
              Intelligent Debugging
            </h3>
            <p className="font-body-md text-on-surface-variant mb-auto">
              Stop guessing. Let the AI analyze stack traces and suggest exact
              fixes before you even write a test.
            </p>
            <div className="w-full h-[120px] border border-outline-variant/20 bg-surface rounded relative overflow-hidden mt-6">
              <div className="absolute top-0 left-0 w-1 h-full bg-error" />
              <div className="p-3 font-mono-code text-[12px]">
                <div className="text-error mb-1">
                  TypeError: Cannot read properties of null
                </div>
                <div className="text-on-surface-variant/50">
                  at processData (utils.ts:42:15)
                </div>
                <div className="mt-3 text-primary flex items-center gap-1 cursor-pointer hover:underline">
                  <Zap size={14} />
                  Suggest Fix
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Instant Compilation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={2}
            className="md:col-span-4 bg-surface-container border border-outline-variant/20 p-8 flex flex-col h-[400px] rounded-lg hover:border-outline-variant/40 transition-colors"
          >
            <Zap size={32} className="text-primary mb-6" />
            <h3 className="font-headline-md text-[24px] mb-2">
              Instant Compilation
            </h3>
            <p className="font-body-md text-on-surface-variant">
              Cloud-native build infrastructure compiles heavy binaries in a
              fraction of the time.
            </p>
          </motion.div>

          {/* Card 4: Generative Test Cases */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={3}
            className="md:col-span-8 bg-surface-container border border-outline-variant/20 p-8 flex flex-col justify-between h-[400px] rounded-lg hover:border-outline-variant/40 transition-colors"
          >
            <div>
              <TestTube size={32} className="text-primary mb-6" />
              <h3 className="font-headline-md text-[24px] mb-2">
                Generative Test Cases
              </h3>
              <p className="font-body-md text-on-surface-variant max-w-md">
                Automatically generate comprehensive unit and integration tests
                based on your function signatures and implementation logic.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 border-t border-outline-variant/20 pt-6">
              <div>
                <div className="font-mono-label text-[11px] text-outline uppercase mb-1">
                  Coverage
                </div>
                <div className="font-headline-md text-primary">94.2%</div>
              </div>
              <div>
                <div className="font-mono-label text-[11px] text-outline uppercase mb-1">
                  Tests Passed
                </div>
                <div className="font-headline-md">1,248</div>
              </div>
              <div>
                <div className="font-mono-label text-[11px] text-outline uppercase mb-1">
                  Time
                </div>
                <div className="font-headline-md">0.8s</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
