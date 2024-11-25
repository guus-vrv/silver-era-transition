import styles from '../styles/Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Silver Era Transition</h1>
          <p className={styles.subtitle}>The European Crossroad for Generational Transitions</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.loginButton}>Login</button>
          <button className={styles.demoButton}>Book a Demo</button>
        </div>
      </div>
      <div className={styles.backgroundImage}>
        {/* Add the background image using CSS for better positioning */}
      </div>
    </section>
  );
}
