import React from 'react';
import { Question } from '../data';

export interface Props {
  rawData: Question[];
}

export const ByteSizes: React.FC<Props> = ({ rawData }) => {
  return (
    <div>
      <h2>Byte Sizes</h2>
    </div>
  );
};
