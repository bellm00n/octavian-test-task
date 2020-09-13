export const backout = (amount: number) => (t: number) => --t * t * ((amount + 1) * t + amount) + 1;

export const lerp = (a1: number, a2: number, t: number): number => a1 * (1 - t) + a2 * t;
