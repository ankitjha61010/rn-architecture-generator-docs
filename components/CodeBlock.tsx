'use client';

import { useState } from 'react';
import { Icon } from './Icon';

/** Code / terminal block with a copy button. */
export function CodeBlock({ code, lang = 'bash', title }: { code: string; lang?: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const text = code.replace(/^\n+|\s+$/g, '');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked (insecure origin) – nothing to do.
    }
  };

  return (
    <div className="code">
      <div className="code-bar">
        <span className="code-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="code-title">{title ?? lang}</span>
        <button type="button" className="code-copy" onClick={copy} aria-label={copied ? 'Copied' : 'Copy code'}>
          <Icon name={copied ? 'check' : 'copy'} size={15} />
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre>
        <code>{highlight(text, lang)}</code>
      </pre>
    </div>
  );
}

/** Tiny highlighter: comments and shell prompts / commands – enough for the snippets in these docs. */
function highlight(text: string, lang: string) {
  if (lang !== 'bash' && lang !== 'sh') return text;
  return text.split('\n').map((line, index) => {
    const hash = line.search(/(^|\s)#/);
    const code = hash >= 0 ? line.slice(0, hash) : line;
    const comment = hash >= 0 ? line.slice(hash) : '';
    const match = code.match(/^(\s*)(npx|npm|yarn|cd|git|docker|node|bundle|pod)(\b.*)$/);
    return (
      <span key={index}>
        {match ? (
          <>
            {match[1]}
            <span className="tok-cmd">{match[2]}</span>
            {renderFlags(match[3])}
          </>
        ) : (
          renderFlags(code)
        )}
        {comment ? <span className="tok-comment">{comment}</span> : null}
        {'\n'}
      </span>
    );
  });
}

function renderFlags(text: string) {
  return text.split(/(\s--?[a-z][\w-]*)/g).map((part, index) =>
    /^\s--?[a-z]/.test(part) ? (
      <span key={index} className="tok-flag">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
