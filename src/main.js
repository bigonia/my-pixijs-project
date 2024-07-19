import { Application, Sprite, Assets } from 'pixi.js';
import * as PIXI from 'pixi.js';
// import { Buffer } from 'buffer';
// const PIXI   = require('pixi.js');
// const { Application, Sprite, Assets } = require('pixi.js');

// //Create a Pixi Application
// let app = new PIXI.Application({width: 256, height: 256});

// //Add the canvas that Pixi automatically created for you to the HTML document
// document.body.appendChild(app.view);

// Asynchronous IIFE
(async () =>
    {
        // Create a PixiJS application.
        const app = new Application();
    
        // Intialize the application.
        await app.init({ background: '#1099bb', resizeTo: window });

        // Then adding the application's canvas to the DOM body.
        document.body.appendChild(app.canvas);

        // Load the bunny texture.
        const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
        // const texture = await Assets.load('src/sample.png');

        // Create a new Sprite from an image path
        const bunny = new Sprite(texture);

        // Add to stage
        app.stage.addChild(bunny);

        // Center the sprite's anchor point
        bunny.anchor.set(0.5);

        // Move the sprite to the center of the screen
        bunny.x = app.screen.width / 2;
        bunny.y = app.screen.height / 2;

        // Add a ticker callback to move the sprite back and forth
        let elapsed = 0.0;
        app.ticker.add((ticker) => {
            elapsed += ticker.deltaTime;
            bunny.x = app.screen.width / 2 + Math.cos(elapsed/50.0) * 200;
        });
        //旋转
        app.ticker.add((time) => {
            bunny.rotation += 0.1 * time.deltaTime;
        });


        // load the texture
        Assets.add({alias: 'pic1', src: 'sample.png'});
        let sprite2 = await Assets.load('pic1');
        app.stage.addChild(sprite2);
        sprite2.x = app.screen.width / 3;
        sprite2.y = app.screen.height / 3;


        // // 创建 PixiJS Loader 实例
        // const loader = PIXI.Loader.shared;

        // // 加载图片资源
        // loader.add('myImage', 'sample.png').load((loader, resources) => {
        //     // 图片加载完成后，创建 Sprite
        //     const sprite3 = new PIXI.Sprite(resources.myImage.texture);
            
        //     // 设置 Sprite 的位置等属性
        //     sprite3.x = 100;
        //     sprite3.y = 100;
            
        //     // 将 Sprite 添加到舞台上显示
        //     app.stage.addChild(sprite3);
        // });

    })();


