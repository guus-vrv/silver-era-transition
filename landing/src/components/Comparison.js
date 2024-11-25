import styles from '../styles/Comparison.module.css';

export default function Comparison() {
  return (
    <section className={styles.comparison}>
      <div className={styles.column}>
        <h2 className={styles.header}>The old way</h2>
        <ul className={styles.list}>
          <li>
            <strong>Sole Focus on Financials:</strong> Traditional methods overlook interpersonal and cultural factors that are critical for a successful transition.
          </li>
          <li>
            <strong>Time-Consuming and Inefficient:</strong> Brokers and sellers rely on personal networks, making the process slow and prone to mismatches.
          </li>
          <li>
            <strong>High Failure Rates:</strong> Mismatches in expectations or poor cultural alignment frequently lead to failed negotiations or post-sale challenges.
          </li>
        </ul>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.column}>
        <h2 className={styles.header}>The SET way</h2>
        <p className={styles.tagline}>... the easier way</p>
        <ul className={styles.list}>
          <li>
            <strong>Cultural and Interpersonal Alignment:</strong> SET prioritizes cultural fit and interpersonal compatibility, ensuring smoother transitions and long-term success for businesses.
          </li>
          <li>
            <strong>Preserving Legacy:</strong> SET helps sellers find successors who align with their values and vision, ensuring their life's work continues authentically.
          </li>
          <li>
            <strong>Streamlined Process:</strong> With SET's structured platform, buyers, sellers, and brokers save time by filtering and matching based on key personal and business factors.
          </li>
        </ul>
      </div>
    </section>
  );
}
