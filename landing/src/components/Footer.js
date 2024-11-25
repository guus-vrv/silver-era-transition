import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p>Subscribe to be notified when our services are live!</p>
        <form className='footer-form'>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className={styles.links}>
        <p>Quick Links</p>
        <ul>
          <li>About Us</li>
          <li>Service</li>
          <li>Pricing</li>
          <li>Blog</li>
        </ul>
      </div>
    </footer>
  );
}