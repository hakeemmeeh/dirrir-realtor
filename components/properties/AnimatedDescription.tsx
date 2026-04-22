"use client";

import { motion } from "framer-motion";

export function AnimatedDescription({ title, description }: { title: string; description: string }) {
  const paragraphs = description.split('\n').filter(p => p.trim().length > 0);

  return (
    <div id="description" className="scroll-mt-32 max-w-4xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {}
        }}
      >
        <div className="overflow-hidden">
          <motion.h2 
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="font-sans text-4xl font-medium tracking-tight text-primary sm:text-5xl"
          >
            {title}
          </motion.h2>
        </div>
        
        <motion.div 
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            visible: { opacity: 1, scaleX: 1, transition: { duration: 1, delay: 0.3, ease: "easeInOut" } }
          }}
          className="premium-hairline-accent mt-8 h-px w-24 origin-left bg-accent" 
        />
        
        <div className="mt-12 space-y-8">
          {paragraphs.map((text, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="font-serif text-lg leading-relaxed text-text-light sm:text-xl lg:text-[1.35rem] lg:leading-[1.8]"
              >
                {text}
              </motion.p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
