/* eslint-env mocha*/

const runtime = require('../src/runtime');

describe('runtime', () => {
  it('toString with a single module', () => {
    const m = runtime();

    m.push([1, 'body { a: 1; }', '']);

    expect(m.toString()).toMatchSnapshot();
  });
  it('toString with multiple modules', () => {
    const m = runtime();

    m.push([2, 'body { b: 2; }', '']);
    m.push([1, 'body { a: 1; }', '']);

    expect(m.toString()).toMatchSnapshot();
  });
  it('toString with media query', () => {
    const m = runtime();

    m.push([1, 'body { a: 1; }', 'screen']);

    expect(m.toString()).toMatchSnapshot();
  });
  it('should import modules', () => {
    const m = runtime();
    const m1 = [1, 'body { a: 1; }', 'screen'];
    const m2 = [2, 'body { b: 2; }', ''];
    const m3 = [3, 'body { c: 3; }', ''];
    const m4 = [4, 'body { d: 4; }', ''];

    m.i([m2, m3], '');
    m.i([m2], '');
    m.i([m2, m4], 'print');
    m.i('.a { color: red; }');
    m.i([m1], 'print');
    m.push(m1);

    expect(m.toString()).toMatchSnapshot();
  });
  it('toString with source mapping', () => {
    const m = runtime(true);

    m.push([
      1,
      'body { a: 1; }',
      '',
      {
        file: 'test.scss',
        sources: ['./path/to/test.scss'],
        mappings: 'AAAA;',
        sourceRoot: 'webpack://',
      },
    ]);

    expect(m.toString()).toMatchSnapshot();
  });
  it('toString without source mapping if btoa not avalibale', () => {
    global.btoa = null;

    const m = runtime(true);

    m.push([
      1,
      'body { a: 1; }',
      '',
      {
        file: 'test.scss',
        sources: ['./path/to/test.scss'],
        mappings: 'AAAA;',
        sourceRoot: 'webpack://',
      },
    ]);

    expect(m.toString()).toMatchSnapshot();
  });
});
