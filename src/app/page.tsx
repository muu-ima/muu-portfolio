import HeroCube from "./components/HeroCube";
import styles from "./page.module.css";

const sections = [
  {
    label: "Projects",
    eyebrow: "Selected Works",
    title: "制作実績",
    description:
      "WordPress制作からNext.jsを使ったWebアプリまで、課題解決に向けたUIと実装を組み立てます。",
    href: "#projects",
  },
  {
    label: "Skills",
    eyebrow: "Tech Stack",
    title: "スキル",
    description:
      "TypeScript、React、Next.jsを中心に、使いやすさと保守しやすさの両方を意識して開発します。",
    href: "#skills",
  },
  {
    label: "About",
    eyebrow: "Profile",
    title: "プロフィール",
    description:
      "ユーザーの課題をWebアプリで解決することを軸に、設計からUI、実装まで横断して取り組みます。",
    href: "#about",
  },
  {
    label: "Contact",
    eyebrow: "Get in Touch",
    title: "お問い合わせ",
    description:
      "制作の相談、ポートフォリオへのフィードバック、協業の話など、お気軽にご連絡ください。",
    href: "#contact",
  },
];

const skills = ["Next.js", "TypeScript", "React", "WordPress", "UI Design"];

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.background} aria-hidden="true" />

      <header className={styles.header}>
        <a href="#top" className={styles.logo}>
          KIYONO
        </a>
        <nav className={styles.headerNav} aria-label="Primary navigation">
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

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
            <a href="#projects" className={styles.primaryButton}>
              View Projects
            </a>
            <a href="#contact" className={styles.secondaryButton}>
              Contact
            </a>
          </div>
        </div>

        <div className={styles.cubeStage} aria-label="3D cube navigation area">
          <div className={styles.stageGlow} aria-hidden="true" />
          <div className={styles.cubeCanvas}>
            <HeroCube />
          </div>
        </div>

        <aside className={styles.guidePanel}>
          <p className={styles.panelLabel}>Cube Navigation</p>
          <h2>
            クリックで
            <br />
            ページを切り替え
          </h2>
          <p>
            現在選択中のセクションを表示。初期表示はProjectsです。
          </p>
        </aside>
      </section>

      <nav className={styles.sectionNav} aria-label="Portfolio sections">
        {sections.map((section) => (
          <a key={section.label} href={section.href}>
            <span>{section.label}</span>
            <strong>{section.title}</strong>
          </a>
        ))}
      </nav>

      <section id="projects" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p>Projects</p>
          <h2>実用性と印象を両立する制作実績。</h2>
        </div>
        <div className={styles.cardGrid}>
          {sections.slice(0, 3).map((section) => (
            <article key={section.label} className={styles.projectCard}>
              <p>{section.eyebrow}</p>
              <h3>{section.title}</h3>
              <span>{section.description}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p>Skills</p>
          <h2>Webアプリを形にする技術セット。</h2>
        </div>
        <ul className={styles.skillList}>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section id="about" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p>About</p>
          <h2>設計、UI、実装をつなげる開発者。</h2>
        </div>
        <p className={styles.bodyText}>
          見た目の美しさだけではなく、ユーザーが迷わず使えること、運用しやすいこと、必要な機能がきちんと届くことを大切にしています。
        </p>
      </section>

      <section id="contact" className={styles.contactSection}>
        <p>Contact</p>
        <h2>Web制作・アプリ開発の相談はこちら。</h2>
        <a href="mailto:hello@example.com">hello@example.com</a>
      </section>
    </main>
  );
}
