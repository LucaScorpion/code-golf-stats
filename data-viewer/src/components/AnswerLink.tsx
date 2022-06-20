import React from 'react';
import { ExternalLink } from './ExternalLink';

export interface Props {
  answerId: number;
}

export const AnswerLink: React.FC<Props> = ({ answerId, children }) => (
  <ExternalLink href={`https://codegolf.stackexchange.com/a/${answerId}`}>{children}</ExternalLink>
);
