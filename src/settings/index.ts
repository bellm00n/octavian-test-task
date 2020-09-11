interface Stage {
 readonly width: number,
 readonly height: number,
 readonly backgroundColor: number,
 readonly preserveDrawingBuffer: boolean,
 readonly [propName: string]: number | boolean | string
}
interface TextStyle {
  readonly [propName: string]: number | boolean | string
}

interface ReelSettings {
  readonly totalCount: number,
  readonly width: number,
  readonly symbolSize: number
}

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

export const textStyle: TextStyle = {
  fontFamily: 'Arial',
  fontSize: 36,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fill: '#ffffff',
};

export const reelSettings: ReelSettings = {
  totalCount: 5,
  width: 160,
  symbolSize: 150,
};
