import styles from './SocialLinks.module.css';

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EtsyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.5 3c.3 2 1.8 3.5 3.8 3.8v2.6c-1.4 0-2.7-.4-3.8-1.1v6.4a5.4 5.4 0 1 1-4.6-5.3v2.7a2.7 2.7 0 1 0 1.9 2.6V3h2.7Z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hessellmakes/',
    icon: InstagramIcon,
  },
  {
    label: 'Etsy shop',
    href: 'https://www.etsy.com/au/shop/Hessellmakes',
    icon: EtsyIcon,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@hessellmakes',
    icon: TikTokIcon,
  },
];

export function SocialLinks() {
  return (
    <ul className={styles.list}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
            aria-label={`${label} (opens in a new tab)`}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
