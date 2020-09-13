import { Stage, TextStyle, ReelSettings } from './setingsTypes';

export const stage: Stage = {
  width: 800,
  height: 640,
  backgroundColor: 0x1099bb,
  preserveDrawingBuffer: true,
};

export const resources: readonly string[] = [
  '/symbol_1.png',
  '/symbol_2.png',
  '/symbol_3.png',
  '/symbol_4.png',
];

export const reelSettings: ReelSettings = {
  totalCount: 5,
  width: 160,
  symbolSize: 160,
  blurMultiplier: 8,
  margin: 80,
};

export const defaultTextStyle: TextStyle = {
  fontFamily: 'Arial',
  fontSize: 36,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fill: '#ffffff',
};

export const fpsTextStyle: TextStyle = {
  fontSize: 26,
  fill: 0xff0000,
};
