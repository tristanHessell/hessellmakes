import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import styles from './ExternalLink.module.css';

interface ExternalLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function ExternalLink({ href, label, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${label} (opens in a new tab)`}
    >
      {label}
      <ExternalLinkIcon className={styles.icon} size={16} aria-hidden="true" />
    </a>
  );
}
