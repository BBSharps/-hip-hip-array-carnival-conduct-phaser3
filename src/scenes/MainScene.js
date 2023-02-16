import Phaser from "phaser";

import background from "../assets/newMap.png";
import grassButton from "../assets/newButton.png";
import menuPanel from "../assets/red_panel.png";
import candyFloss from "../assets/candyFloss-stall.png";
import popcorn from "../assets/popcorn-stall.png";
import hotdog from "../assets/hotdog-stall.png";
import hookaduck from "../assets/hook-a-duck-stall.png";
import carousel from "../assets/Carousel-stall.png";
import basketball from "../assets/basketball-stall.png";
import coconutshy from "../assets/coconutshy-stall.png";
import dodgems from "../assets/dodgenms-stall.png";

import music from "../assets/Groovy booty.wav";

import { Player } from "../statistics/class-player";
import HotDog from "../statistics/class-stand-confectionary";
import PopCorn from "../statistics/class-stand-confectionary";
import CandyFloss from "../statistics/class-stand-confectionary";
import Carousel from "../statistics/class-stand-attraction";
import Dodgems from "../statistics/class-stand-attraction";
import CoconutShy from "../statistics/class-stand-prize";
import HookADuck from "../statistics/class-stand-prize";
import Basketball from "../statistics/class-stand-prize";
let clicked = "";

export default class MyGame extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
    this.player = new Player();
    this.currentTime = 0;
  }

  preload() {
    this.load.image("background", background);
    this.load.image("grass-button", grassButton);
    this.load.audio("music", music);
    this.load.image("menu-panel", menuPanel);
    this.load.image("candy-floss", candyFloss);
    this.load.image("popcorn", popcorn);
    this.load.image("hot-dog", hotdog);
    this.load.image("basketball", basketball);
    this.load.image("hook-a-duck", hookaduck);
    this.load.image("carousel", carousel);
    this.load.image("coconut-shy", coconutshy);
    this.load.image("dodgems", dodgems);
  }

  create() {
    this.add.image(752, 448, "background").setDepth(-1);

    const clickableGrass = [];

    let addX = 0;
    let addY = 0;
    let xValue = 0;
    let yValue = 0;
    let buildPositionX = 0;
    let buildPositionY = 0;

    for (let i = 0; i < 30; i++) {
      if (i < 11) {
        xValue = 340 + addX;
        yValue = 360;
        clickableGrass.push({ x: xValue, y: yValue });
        addX += 96;
      }
      i === 11 ? (addX = 0) : null;
      if (i < 20 && i > 11) {
        xValue = 426 + addX;
        yValue = 504;
        clickableGrass.push({ x: xValue, y: yValue });
        addX += 96;
      }
      i === 20 ? (addX = 0) : null;
      if (i < 30 && i > 21) {
        xValue = 426 + addX;
        yValue = 696;
        clickableGrass.push({ x: xValue, y: yValue });
        addX += 96;
      }
    }

    this.music = this.sound.add("music", {
      mute: false,
      volume: 0.07,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    });

    this.music.play();

    this.musicPaused = false;

    this.pauseMusicText = this.add
      .text(50, 80, "Pause/Play music", {
        backgroundColor: "#D65C21",
        fontSize: 35,
        fontFamily: "Rubik Gemstones",
      })
      .setInteractive({ useHandCursor: true })
      .on(
        "pointerup",
        function () {
          this.musicPaused === false
            ? (this.musicPaused = true)
            : (this.musicPaused = false);

          this.musicPaused === true ? this.music.pause() : this.music.play();
        },
        this
      );

    for (let i = 0; i < clickableGrass.length; i++) {
      const name = "tile" + i;

      if (i === 0 || i === 2 || i === 4 || i === 6 || i === 8) {
        this[name] = this.add
          .image(clickableGrass[i].x, clickableGrass[i].y, "grass-button")
          .setDepth(1)
          .setDisplaySize(192, 192)
          .setInteractive({ useHandCursor: true })
          .setAlpha(0.7);
        this[name].x = this[name].x + 46;
        this[name].y = this[name].y - 56;
        this[name].on(
          "pointerdown",
          function () {
            clicked = this[name];

            buildPositionX = this[name].x;
            buildPositionY = this[name].y;
            this.scene.pause().launch("StandMenu", {
              player: this.player,
              option: ["attraction"],
            });
          },
          this
        );
      } else {
        this[name] = this.add
          .image(clickableGrass[i].x, clickableGrass[i].y, "grass-button")
          .setDepth(1)
          .setDisplaySize(80, 80)
          .setInteractive({ useHandCursor: true })
          .setAlpha(0.7)
          .on(
            "pointerdown",
            function () {
              clicked = this[name];
              buildPositionX = this[name].x;
              buildPositionY = this[name].y;

              this.scene.pause().launch("StandMenu", {
                player: this.player,
                option: ["stall", "confectionary"],
              });
            },
            this
          );
        if (i === 1 || i === 3 || i === 5 || i === 7 || i === 9) {
          this[name].setVisible(false);
        }
      }
    }
    this.playerCoins = 0;
    this.currentTotalVisitors = 0;
    this.currentVisitors = this.add

      .text(1050, 80, `Current Visitors: ${this.currentTotalVisitors}`, {
        fontSize: 35,
        fontFamily: "Rubik Gemstones",
      })
      .setPadding(5)
      .setDepth(10);

    this.totalCoins = this.add

      .text(1050, 30, "Total Coins: 0", {
        fontSize: 35,
        fontFamily: "Rubik Gemstones",
      })
      .setPadding(5)
      .setDepth(10);

    this.events.on("resume", function (scene, data) {
      if (data) {
        const classes = [
          {
            Carousel: new Carousel(
              scene.scene,
              buildPositionX,
              buildPositionY,
              data.purchasedName
            ),
          },
          {
            Dodgems: new Dodgems(
              scene.scene,
              buildPositionX,
              buildPositionY,
              data.purchasedName
            ),
          },
          {
            "Coconut Shy": new CoconutShy(
              scene.scene,
              buildPositionX,
              buildPositionY,
              data.purchasedName
            ),
          },
          {
            "Hook a Duck": new HookADuck(
              scene.scene,
              buildPositionX,
              buildPositionY,
              data.purchasedName
            ),
          },
          {
            "Basketball Toss": new Basketball(
              scene.scene,
              buildPositionX,
              buildPositionY,
              data.purchasedName
            ),
          },
          {
            "Hot Dogs": new HotDog(
              scene.scene,
              buildPositionX,
              buildPositionY,
              data.purchasedName
            ),
          },
          {
            "Pop Corn": new PopCorn(
              scene.scene,
              buildPositionX,
              buildPositionY,
              data.purchasedName
            ),
          },
          {
            "Candy Floss": new CandyFloss(
              scene.scene,
              buildPositionX,
              buildPositionY,
              data.purchasedName
            ),
          },
        ];

        for (let i = 0; i < classes.length; i++) {
          if (classes[i][data.purchasedName]) {
            this[data.purchasedName] = classes[i][data.purchasedName];
            this[data.purchasedName].scene.player.addPurchased(
              this[data.purchasedName]
            );
            this[data.purchasedName].scene.purchasedTime =
              this[data.purchasedName].scene.currentTime;
          }
        }
      }
    });

    this.seconds = 0;
    this.minutes = 0;
    this.count = 0;
    this.showtime = this.add
      .text(50, 30, `${this.minutes} : ${this.seconds}`, {
        fontSize: 40,
        fontFamily: "Rubik Gemstones",
      })
      .setDepth(10);
  }

  update() {
    this.count = this.count + 1;

    if (this.count % 10 === 0) {
      this.seconds = this.seconds + 1;

      if (this.seconds === 60) {
        this.minutes = this.minutes + 1;
        this.seconds = 0;
      }

      this.seconds < 10
        ? this.showtime.setText(`${this.minutes}:0${this.seconds}`)
        : this.showtime.setText(`${this.minutes}:${this.seconds}`);
    }

    if (this.minutes === 10) {
      this.scene.pause().launch("EndGame", { player: this.player });
    }
    this.totalCoins.setText(
      `Total Coins: ${this.player.playerCoins.totalCoins}`
    );

    this.currentTime = this.minutes * 60 + this.seconds;

    if (this.count % 10 === 0) {
      this.player.purchased.forEach((stand) => {
        this.stats = stand.calculateAll(this.currentTime);
        this.currentTotalVisitors =
          this.currentTotalVisitors + this.stats.visitors;
        this.currentVisitors.setText(
          `Current Visitors: ${this.currentTotalVisitors}`
        );

        if (!stand.recMaintenance && this.stats.maintenance === 60) {
          stand.recMaintenance = this.add
            .text(stand.x - 25, stand.y - 40, "!", {
              fontSize: 50,
              color: "#D65C21",
              backgroundColor: "white",
            })
            .setDepth(10);
          this.tweens.add({
            targets: stand.recMaintenance,
            scaleX: 0.1,
            scaleY: 0.1,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
          });
        }
        if (stand.recMaintenance && this.stats.maintenance > 60) {
          stand.recMaintenance.destroy();
          delete stand.recMaintenance;
        }
      });
    }
  }
}
