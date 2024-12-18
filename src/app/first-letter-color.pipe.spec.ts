import { FirstLetterColorPipe } from './first-letter-color.pipe';

describe('FirstLetterColorPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstLetterColorPipe();
    expect(pipe).toBeTruthy();
  });
});
