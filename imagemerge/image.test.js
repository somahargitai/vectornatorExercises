const Image = require('./image');

test('simple merge', () => {
  const firstImage = new Image(true);
  const secondImage = new Image(true);
  const merged = firstImage.merge(secondImage);

  expect(merged.toArray()).toEqual('white');
});

test('second level merge', () => {
  const firstImage = new Image([
    new Image(true),
    new Image(false),
    new Image(false),
    new Image(true),
  ]);
  const secondImage = new Image([
    new Image(true),
    new Image(false),
    new Image(false),
    new Image(true),
  ]);
  const merged = firstImage.merge(secondImage);

  expect(merged.toArray()).toEqual(['white', 'black', 'black', 'white']);
});

test('first with second level merge', () => {
  const firstImage = new Image(true);
  const secondImage = new Image([
    new Image(true),
    new Image(false),
    new Image(false),
    new Image(true),
  ]);
  const merged = firstImage.merge(secondImage);

  expect(merged.toArray()).toEqual(['white', 'black', 'black', 'white']);
});

test('multi level merge', () => {
  const firstImage = new Image([
    new Image(false),
    new Image(true),
    new Image([
      new Image(true),
      new Image(false),
      new Image(false),
      new Image(true),
    ]),
    new Image([
      new Image(true),
      new Image(false),
      new Image(false),
      new Image([
        new Image(true),
        new Image(false),
        new Image(true),
        new Image(false),
      ]),
    ]),
  ]);

  const secondImage = new Image([
    new Image(false),
    new Image(true),
    new Image(false),
    new Image([
      new Image(true),
      new Image(false),
      new Image(true),
      new Image(false),
    ]),
  ]);
  const merged = firstImage.merge(secondImage);

  expect(merged.toArray()).toEqual([
    'black',
    'white',
    ['black', 'black', 'black', 'black'],
    ['white', 'black', 'black', ['black', 'black', 'black', 'black']],
  ]);
});

test('invalid string parameter', () => {
  expect(() => {
    const firstImage = newImage('scrooge');
  }).toThrow();
});

test('invalid tile amount parameter', () => {
  expect(() => {
    const firstImage = new Image([
      new Image(true),
      new Image(false),
      new Image(false),
    ]);
  }).toThrow();
});
