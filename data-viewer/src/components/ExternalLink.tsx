import React from 'react';

export interface Props {
  href: string;
}

export const ExternalLink: React.FC<Props> = ({ href, children }) => (
  <a href={href} rel="nofollow noreferrer noopener">{children}</a>
);
