import HeroShell from "./components/HeroShell";
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

const projects = [
  {
    title: "Portfolio Cube Navigation",
    category: "Next.js / 3D UI",
    description:
      "3Dキューブをナビゲーションとして使い、Heroの第一印象とページ遷移の導線を同時に作るポートフォリオ実験。",
    stack: ["Next.js", "R3F", "Framer Motion"],
  },
  {
    title: "WordPress Site Build",
    category: "CMS / Web Production",
    description:
      "更新しやすさを重視した企業・個人向けサイト制作。設計、テーマ調整、基本的な運用導線まで対応。",
    stack: ["WordPress", "HTML/CSS", "JavaScript"],
  },
  {
    title: "Dashboard UI Study",
    category: "UI Design / Front-end",
    description:
      "情報の見通し、状態の切り替え、カード設計を意識したWebアプリUIの自主制作スタディ。",
    stack: ["React", "TypeScript", "UI Design"],
  },
];

const skillGroups = [
  {
    title: "Front-end",
    items: ["Next.js", "React", "TypeScript", "CSS Modules"],
  },
  {
    title: "Web Production",
    items: ["WordPress", "Responsive Design", "CMS Setup", "SEO Basics"],
  },
  {
    title: "UI / Motion",
    items: ["UI Design", "Glass UI", "Framer Motion", "React Three Fiber"],
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.background} aria-hidden="true" />

      <header className={styles.header}>
        <a href="#top" className={styles.logo}>
          muu-portfolio
        </a>
        <nav className={styles.headerNav} aria-label="Primary navigation">
          <a
            href="https://github.com/muu-ima/muu-portfolio"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <HeroShell sections={sections} />

      <section id="projects" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p>Projects</p>
          <h2>実用性と印象を両立する制作実績。</h2>
        </div>
        <div className={styles.cardGrid}>
          {projects.map((project) => (
            <article key={project.title} className={styles.projectCard}>
              <p>{project.category}</p>
              <h3>{project.title}</h3>
              <span>{project.description}</span>
              <ul className={styles.projectStack}>
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p>Skills</p>
          <h2>Webアプリを形にする技術セット。</h2>
        </div>
        <div className={styles.skillGrid}>
          {skillGroups.map((group) => (
            <article key={group.title} className={styles.skillCard}>
              <h3>{group.title}</h3>
              <ul className={styles.skillList}>
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p>About</p>
          <h2>設計、UI、実装をつなげる開発者。</h2>
        </div>
        <div className={styles.aboutBody}>
          <p className={styles.bodyText}>
            見た目の美しさだけではなく、ユーザーが迷わず使えること、運用しやすいこと、必要な機能がきちんと届くことを大切にしています。
          </p>
          <ul>
            <li>ユーザー課題からUIと実装を考える</li>
            <li>小さく試しながら体験を磨く</li>
            <li>運用しやすい構成を意識する</li>
          </ul>
        </div>
      </section>

      <section id="contact" className={styles.contactSection}>
        <div>
          <p>Contact</p>
          <h2>Web制作・アプリ開発の相談はこちら。</h2>
        </div>
        <div className={styles.contactBody}>
          <span>
            制作相談、ポートフォリオへのフィードバック、協業の話など、お気軽にご連絡ください。
          </span>
          <a href="mailto:hello@example.com">hello@example.com</a>
        </div>
      </section>
    </main>
  );
}
