import Phaser from 'phaser';
import Stands from '../Stands';
import menuPanel from '../assets/red_panel.png';
import Button from '../../button';

class StandMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'StandMenu' });
  }
  init(data) {
    this.option = data.option;
    this.player = data.player;
  }
  preload() {
    this.load.image('menuPanel', menuPanel);
  }

  create() {
    this.position = 50;
    let yPosition = 50;
    const exitButton = new Button(
      this,
      300,
      110,
      '#633fab',
      'Exit Menu',
      ' MainScene'
    );

    this.container = this.add.container(700, 500);
    this.menu = this.add
      .image(0, 0, 'menu-panel')
      .setDepth(2)
      .setScale(5)
      .setAlpha(0.8);

    this.container.add(this.menu);

    this.option.forEach((categoryName) => {
      this[categoryName] = this.add
        .text(-130, yPosition - 150, categoryName, {
          backgroundColor: '#AB3F63',
          fontSize: 40,
          fontFamily: 'Rubik Gemstones',
        })
        .setDepth(4)
        .setPadding(10)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () =>
          this[categoryName].setStyle({ fill: '#E5C5D0' })
        )
        .on('pointerout', () => this[categoryName].setStyle({ fill: '#FFF' }));
      this.container.add(this[categoryName]);
      yPosition += 110;

      this[categoryName].on(
        'pointerup',
        function () {
          if (this['stall']) {
            this['stall'].setVisible(false);
          }
          if (this['attraction']) {
            this['attraction'].setVisible(false);
          }
          if (this['confectionary']) {
            this['confectionary'].setVisible(false);
          }
          const backBtn = this.add
            .text(480, 290, 'Back', {
              backgroundColor: '#AB3FAB',
              fontSize: 35,
              fontFamily: 'Rubik Gemstones',
            })
            .setDepth(4)
            .setPadding(10)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => backBtn.setStyle({ fill: '#d59fb0 ' }))
            .on('pointerout', () => backBtn.setStyle({ fill: '#FFF' }))
            .on(
              'pointerdown',
              function () {
                this.position = 50;
                this.scene.start();
              },
              this
            );

          Stands.forEach((stand) => {
            const { name } = stand;

            if (stand.category === categoryName) {
              this[name] = this.add
                .text(-90, this.position - 50, stand.name, {
                  backgroundColor: '#AB3F63',
                  fontSize: 30,
                  fontFamily: 'Rubik Gemstones',
                })
                .setDepth(4)
                .setPadding(10)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () =>
                  this[name].setStyle({ fill: '#E5C5D0' })
                )
                .on('pointerout', () => this[name].setStyle({ fill: '#FFF' }));
              this.container.add(this[name]);
              this.position = this.position - 110;

              this[name].on(
                'pointerdown',
                function () {
                  this.scene
                    .sleep()
                    .launch('StandCard', { stand: stand, player: this.player });
                },
                this
              );
            }
          });
        },
        this
      );
    });
  }

  update() {}
}
export default StandMenu;
