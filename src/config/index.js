const config = {
  stage: {
    width: 800,
    height: 640,
    backgroundColor: 0x1099bb,
    preserveDrawingBuffer: true,
  },

  resources: [
    '/assets/symbol_1.png',
    '/assets/symbol_2.png',
    '/assets/symbol_3.png',
    '/assets/symbol_4.png',
  ],

  reel: {
    width: 160,
    symbolSize: 150,
  },

  textStyles: {
    topText: {
      fontFamily: 'serif',
      fontSize: 36,
      fontWeight: 'bold',
      fill: '#ffffff',
    },
  },
};

export default config;
