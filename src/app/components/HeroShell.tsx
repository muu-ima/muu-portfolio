"use client";

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

  return (
    <>
      <section id="top" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Web Developer</p>
          <h1>
            ユーザーの課題を
            <br />
            Webアプリで解決する
          </h1>
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
              onClick={() => setActiveLabel("Contact")}
              type="button"
            >
              Contact
            </button>
          </div>
        </div>

        <div className={styles.cubeStage} aria-label="3D cube navigation area">
          <div className={styles.stageGlow} aria-hidden="true" />
          <div className={styles.cubeCanvas}>
            <HeroCube activeLabel={activeLabel} />
          </div>
        </div>

        <aside className={styles.guidePanel}>
          <p className={styles.panelLabel}>Cube Navigation</p>
          <h2>
            クリックで
            <br />
            キューブを回転
          </h2>
          <p>
            現在選択中: {activeSection?.label ?? "Projects"}。下のボタンで面を切り替えます。
          </p>
        </aside>
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
    </>
  );
}
