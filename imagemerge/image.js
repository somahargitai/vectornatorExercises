class Image {
  constructor(color) {
    if (
      !(typeof color === 'boolean' || Array.isArray(color)) ||
      (Array.isArray(color) && color.length !== 4)
    ) {
      throw new Error('Invalid Image parameter');
    }
    this.color = color;
  }

  merge(mImage) {
    if (Array.isArray(this.color)) {
      if (Array.isArray(mImage.color)) {
        return new Image([
          mImage.color[0].merge(this.color[0]),
          mImage.color[1].merge(this.color[1]),
          mImage.color[2].merge(this.color[2]),
          mImage.color[3].merge(this.color[3]),
        ]);
      } else {
        return new Image([
          mImage.merge(this.color[0]),
          mImage.merge(this.color[1]),
          mImage.merge(this.color[2]),
          mImage.merge(this.color[3]),
        ]);
      }
    } else {
      if (Array.isArray(mImage.color)) {
        return new Image([
          mImage.color[0].merge(this),
          mImage.color[1].merge(this),
          mImage.color[2].merge(this),
          mImage.color[3].merge(this),
        ]);
      } else {
        return new Image(mImage.color && this.color);
      }
    }
  }

  toArray() {
    if (Array.isArray(this.color)) {
      return [
        this.color[0].toArray(),
        this.color[1].toArray(),
        this.color[2].toArray(),
        this.color[3].toArray(),
      ];
    } else {
      return this.color ? 'white' : 'black';
    }
  }
}

module.exports = Image;
