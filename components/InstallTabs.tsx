'use client';

import { useState } from 'react';
import { site } from '@/lib/site';
import { Icon } from './Icon';

const commands = {
  npx: `npx ${site.packageName}`,
  npm: `npm install -g ${site.packageName}`,
  yarn: `yarn global add ${site.packageName}`,
} as const;

type Manager = keyof typeof commands;

/** Install command with npx / npm / yarn tabs and a copy button. */
export function InstallTabs({ dark = false }: { dark?: boolean }) {
  const [manager, setManager] = useState<Manager>('npx');
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(commands[manager]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked – the command stays selectable.
    }
  };

  return (
    <div className={dark ? 'install install-dark' : 'install'}>
      <div className="install-tabs" role="tablist" aria-label="Package manager">
        {(Object.keys(commands) as Manager[]).map(key => (
          <button key={key} type="button" role="tab" aria-selected={manager === key} className={manager === key ? 'active' : undefined} onClick={() => setManager(key)}>
            {key}
          </button>
        ))}
      </div>
      <div className="install-cmd">
        <span className="install-prompt">$</span>
        <code>{commands[manager]}</code>
        <button type="button" className="icon-btn" onClick={copy} aria-label={copied ? 'Copied' : 'Copy command'}>
          <Icon name={copied ? 'check' : 'copy'} size={16} />
        </button>
      </div>
    </div>
  );
}
