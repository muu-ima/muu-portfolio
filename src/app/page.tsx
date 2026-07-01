import HeroShell from "./components/HeroShell";
import styles from "./page.module.css";

const sections = [
  {
    label: "Projects",
    description:
      "WordPress制作からNext.jsを使ったWebアプリまで、課題解決に向けたUIと実装を組み立てます。",
    href: "#top",
  },
  {
    label: "Skills",
    description:
      "TypeScript、React、Next.jsを中心に、使いやすさと保守しやすさの両方を意識して開発します。",
    href: "#top",
  },
  {
    label: "About",
    description:
      "ユーザーの課題をWebアプリで解決することを軸に、設計からUI、実装まで横断して取り組みます。",
    href: "#top",
  },
  {
    label: "Contact",
    description:
      "制作の相談、ポートフォリオへのフィードバック、協業の話など、お気軽にご連絡ください。",
    href: "mailto:hello@example.com",
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
          <a href="mailto:hello@example.com">Contact</a>
        </nav>
      </header>

      <HeroShell sections={sections} />

      <footer className={styles.footer}>
        <span>muu-portfolio</span>
        <nav aria-label="Footer navigation">
          <a
            href="https://github.com/muu-ima/muu-portfolio"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:hello@example.com">Contact</a>
        </nav>
      </footer>
    </main>
  );
}
