"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import HeroCube from "./HeroCube";
import styles from "../page.module.css";

type Section = {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
};

type HeroShellProps = {
  sections: Section[];
};

export default function HeroShell({ sections }: HeroShellProps) {
  const [activeLabel, setActiveLabel] = useState(sections[0]?.label ?? "Projects");
  const activeSection =
    sections.find((section) => section.label === activeLabel) ?? sections[0];
  const activeIndex = sections.findIndex((section) => section.label === activeLabel);

  if (!activeSection) {
    return null;
  }

  return (
    <>
      <section id="top" className={styles.hero}>
        <div className={styles.cubeStage} aria-label="3D cube navigation area">
          <div className={styles.stageGlow} aria-hidden="true" />
          <div
            aria-label="Cube section selector"
            className={styles.cubeCanvas}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                const nextIndex =
                  activeIndex >= 0 ? (activeIndex + 1) % sections.length : 0;
                setActiveLabel(sections[nextIndex].label);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <HeroCube activeLabel={activeLabel} onFaceSelect={setActiveLabel} />
          </div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Web Developer</p>
            <h1>
              <span>muu-portfolio</span>
              <span>触ってめぐるWeb制作</span>
            </h1>
            <span className={styles.heroRule} aria-hidden="true" />
            <p className={styles.lead}>
              キューブを操作しながら、制作実績・スキル・プロフィールをめぐれるポートフォリオです。
              Next.jsとTypeScriptを使ったWebアプリ開発を中心に制作しています。
            </p>
            <div className={styles.heroActions}>
              <button
                className={styles.primaryButton}
                onClick={() => setActiveLabel("Projects")}
                type="button"
              >
                View Projects
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => setActiveLabel("About")}
                type="button"
              >
                About Me
              </button>
            </div>
          </div>

          <aside className={styles.guidePanel}>
            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                initial={{ opacity: 0, y: -12 }}
                key={activeSection.label}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <p className={styles.panelLabel}>Selected</p>
                <h2>{activeSection.label}</h2>
                <p className={styles.guideDescription}>
                  {activeSection.description}
                </p>
                <a className={styles.guideLink} href={activeSection.href}>
                  Open {activeSection.label}
                </a>
              </motion.div>
            </AnimatePresence>
            <div className={styles.guideIcon} aria-hidden="true">
              <span />
            </div>
          </aside>
        </div>
      </section>

      <nav className={styles.sectionNav} aria-label="Portfolio sections">
        {sections.map((section) => (
          <button
            aria-pressed={activeLabel === section.label}
            className={activeLabel === section.label ? styles.activeNavItem : ""}
            key={section.label}
            onClick={() => setActiveLabel(section.label)}
            type="button"
          >
            <span>{section.label}</span>
            <strong>{section.title}</strong>
          </button>
        ))}
      </nav>

      <div className={styles.selectedPanelWrap}>
        <AnimatePresence mode="wait">
          <motion.article
            animate={{ opacity: 1, y: 0 }}
            className={styles.selectedPanel}
            exit={{ opacity: 0, y: 10 }}
            initial={{ opacity: 0, y: 10 }}
            key={activeSection.label}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div>
              <p>{activeSection.eyebrow}</p>
              <h2>{activeSection.title}</h2>
            </div>
            <div>
              <span>{activeSection.description}</span>
              <a href={activeSection.href}>Open {activeSection.label}</a>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </>
  );
}
