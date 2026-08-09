"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileCode2, Sparkles } from "lucide-react";
import { useState } from "react";

export function ContextAwareAI() {
  const [isFixed, setIsFixed] = useState(false);

  return (
    <section
      id="ai"
      className="w-full py-section-gap px-margin-mobile lg:px-margin-desktop bg-surface-container-lowest border-t border-outline-variant/10"
    >
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-section-gap items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="font-mono-label text-primary mb-4 uppercase tracking-widest">
              Context-Aware AI
            </div>
            <h2 className="font-display-lg text-[40px] leading-tight font-semibold mb-6">
              Understand your code, instantly.
            </h2>
            <p className="font-body-lg text-on-surface-variant mb-8 leading-relaxed max-w-md">
              The assistant lives alongside your codebase. It doesn't just
              autocomplete; it reads your entire project context to explain
              complex logic, find obscure bugs, and rewrite functions
              idiomatically.
            </p>
            <ul className="flex flex-col gap-4 font-body-md text-on-surface-variant">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                Multi-file context understanding
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                Semantic refactoring suggestions
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                Automated documentation generation
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-[500px] border border-outline-variant/30 bg-[#09090B] rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row"
          >
            <div className="w-full md:w-3/5 h-full border-r border-outline-variant/20 p-4 bg-[#09090B] flex flex-col">
              <div className="font-mono-label text-[11px] text-outline mb-4 flex items-center gap-2">
                <FileCode2 size={14} />
                data_processor.py
              </div>
              <pre className="font-mono-code text-[13px] leading-loose text-on-surface-variant overflow-hidden">
                <code className="language-python">
                  <span className="text-outline">12</span> def
                  extract_metadata(payload):
                  <br />
                  <span className="text-outline">13</span>     results = []
                  <br />
                  <span className="text-outline">14</span>     for item in
                  payload['data']:
                  <br />
                  <span className="text-outline">15</span>         
                  {isFixed ? (
                    <span className="bg-success/20 border-b border-success text-success">
                      meta = item.get('metadata', {}).get('tags', [None])[0]
                    </span>
                  ) : (
                    <span className="bg-error/20 border-b border-error">
                      meta = item['metadata']['tags'][0]
                    </span>
                  )}
                  <br />
                  <span className="text-outline">16</span>         
                  results.append(meta)
                  <br />
                  <span className="text-outline">17</span>     return results
                  <br />
                </code>
              </pre>
            </div>
            <div className="w-full md:w-2/5 h-full bg-surface-container-low p-4 flex flex-col">
              <div className="font-mono-label text-[11px] text-outline mb-4 border-b border-outline-variant/20 pb-2">
                AI Assistant
              </div>
              <div className="flex flex-col gap-4 overflow-y-auto mb-4">
                <div className="bg-surface p-3 rounded border border-outline-variant/20">
                  <p className="font-body-md text-[13px] text-on-surface-variant mb-2">
                    There's a potential `IndexError` on line 15 if `tags` is an
                    empty list, and a `KeyError` if `metadata` or `tags` are
                    missing.
                  </p>
                  <div className="p-2 bg-[#09090B] border border-outline-variant/10 rounded font-mono-code text-[11px] text-on-surface">
                    meta = item.get('metadata', {}).get('tags', [None])[0]
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-outline-variant/20">
                <button 
                  onClick={() => setIsFixed(true)}
                  disabled={isFixed}
                  className={`w-full py-2 rounded font-mono-label text-[12px] transition-colors flex items-center justify-center gap-2 ${
                    isFixed 
                      ? "bg-success/10 text-success border border-success/20 cursor-default"
                      : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                  }`}
                >
                  {isFixed ? (
                    <>
                      <CheckCircle2 size={14} />
                      Fix Applied
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      Apply Fix
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
