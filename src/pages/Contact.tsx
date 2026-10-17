import { useState, type FormEvent } from 'react';
import { useSeo } from '../hooks/useSeo';
import { siteRoutes } from '../siteRoutes';
import styles from './Contact.module.css';

// Not linked from the nav - reachable only by visiting /contact directly.
export function Contact() {
  useSeo({
    noindex: !siteRoutes.contact.indexable,
    title: 'Contact',
    description:
      'Commission a custom hand-stitched soccer ball from HessellMakes in Perth, WA.',
    // Not linked from anywhere in the UI, by design, so a search engine
    // should not index or recommend this page either.
  });

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className={styles.page}>
      <h1>Contact</h1>
      <p className={styles.intro}>
        Have a question about a piece, or want to commission something? Send a
        message and we'll get back to you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows={5} required />
        </div>

        <button className={styles.submit} type="submit">
          Send message
        </button>

        {submitted && (
          <p className={styles.status} role="status">
            Thanks - we'll be in touch soon.
          </p>
        )}
      </form>
    </div>
  );
}
