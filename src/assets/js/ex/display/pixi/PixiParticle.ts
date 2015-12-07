class Particle extends PIXI.Sprite {
  protected _imagePath:string;
  constructor(_options:any) {
    super();
    if (_options.image) this._imagePath = _options.image;
    this._texture = PIXI.Texture.fromImage(this._imagePath);
  }
}
export = Particle;