import styles from '../styles/Process.module.css';

export default function Process() {
  return (
    <section className={styles.process}>
      <h2>Jumpstarting the Journey</h2>
      <div className={styles.steps}>
        <div>Data Collection/Integration</div>
        <div>Matchmaking</div>
        <div>Initial Contact</div>
      </div>
    </section>
  );
}