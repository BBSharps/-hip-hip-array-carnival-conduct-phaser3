class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, backgroundColor, text, sceneToStart) {
    super(scene);
    this.sceneToStart = sceneToStart;
    this.scene = scene;
    this.x = x;
    this.y = y;
    const button = this.scene.add.image(x, y).setInteractive({ useHandCursor: true });
    const buttonText = this.scene.add.text(x, y, text, {
      fontSize: '35px',
      backgroundColor: backgroundColor,
      fontFamily: 'Rubik Gemstones',
    })
    .setPadding(10)
    
    Phaser.Display.Align.In.Center(buttonText, button);
    this.add(button);
    this.add(buttonText);
    button.setDepth(25)
    button.on(
      'pointerdown',
      () => {
        this.scene.scene.setActive(true, 'MainScene');
        this.scene.scene.stop('StandMenu');
        this.scene.scene.stop('StandCard');
        this.scene.scene.stop('InfoStand');
      },
      scene
    );

    this.scene.add.existing(this);
  }
}

export default Button;
