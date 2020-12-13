import Interval from '../src/Interval';
import Pitch from '../src/Pitch';
import { PitchCoordinate } from '../src/Constants';

describe('Interval', () => {
  describe('#constructor', () => {
    it('should calculate from pitch range correctly', () => {
      expectCoords([
        ['C4', 'C4', [0, 0]],
        ['C4', 'D4', [1, 2]],
        ['C4', 'F#6', [17, 30]],
      ]);
    });
  });

  describe('#qualityOffset', () => {
    it('should get correct offset', () => {
      expectQualityOffsets([
        ['C4', 'C4', 0],
        ['C4', 'Cx4', 2],
        ['C4', 'Dbb4', -2],
        ['Bb3', 'D#4', 1],
        ['D4', 'Fbb4', -3],
      ]);
    });
  });

  describe('#quality', () => {
    it('should get correct quality', () => {
      expectQualities([
        ['E2', 'Bx', 'AA'],
        ['C4', 'Fx4', 'AA'],
        ['G4', 'D#5', 'A'],
        ['C4', 'A4', 'M'],
        ['Bb3', 'Dbb4', 'd'],
        ['D4', 'Fb4', 'd'],
        ['G4', 'Cbb5', 'dd'],
        ['G4', 'Cbb5', 'dd'],
        ['F4', 'Abbbb5', 'ddd'],
      ]);
    });
  });
});

function getIntervalFromSpnRange(startSpn: string, endSpn: string): Interval {
  return new Interval({
    pitchRange: {
      start: new Pitch({ spn: startSpn }),
      end: new Pitch({ spn: endSpn }),
    },
  });
}

function expectCoords(expectations: [string, string, PitchCoordinate][]): void {
  expectations.forEach(([startSpn, endSpn, coord]) => {
    expect(getIntervalFromSpnRange(startSpn, endSpn).coord()).toEqual(coord);
  });
}

function expectQualityOffsets(expectations: [string, string, number][]): void {
  expectations.forEach(([startSpn, endSpn, offset]) => {
    expect(getIntervalFromSpnRange(startSpn, endSpn).qualityOffset()).toBe(
      offset
    );
  });
}

function expectQualities(expectations: [string, string, string][]): void {
  expectations.forEach(([startSpn, endSpn, quality]) => {
    expect(getIntervalFromSpnRange(startSpn, endSpn).quality()).toBe(quality);
  });
}
