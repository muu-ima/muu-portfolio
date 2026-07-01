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

  const showNextSection = () => {
    const nextIndex = activeIndex >= 0 ? (activeIndex + 1) % sections.length : 0;
    setActiveLabel(sections[nextIndex].label);
  };

  return (
    <>
      <section id="top" className={styles.hero}>
        <div className={styles.cubeStage} aria-label="3D cube navigation area">
          <div className={styles.stageGlow} aria-hidden="true" />
          <div
            aria-label="Next cube section"
            className={styles.cubeCanvas}
            onClick={showNextSection}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                showNextSection();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <HeroCube activeLabel={activeLabel} />
          </div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Web Developer</p>
            <h1>
              <span>ユーザーの課題を、</span>
              <span>Webアプリで解決する</span>
            </h1>
            <span className={styles.heroRule} aria-hidden="true" />
            <p className={styles.lead}>
              WordPress制作からNext.js・TypeScriptを使ったWebアプリ開発まで対応。使いやすいUIと実用的なシステム開発を得意とする。
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
            <div>
              <p className={styles.panelLabel}>Cube Navigation</p>
              <h2>クリックでキューブを回転</h2>
              <p>
                現在選択中: {activeSection.label}。キューブと下のカードが切り替わります。
              </p>
            </div>
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
