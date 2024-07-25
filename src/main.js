import { Application, Sprite, Assets } from 'pixi.js';
import * as PIXI from 'pixi.js';

import sampleImage from './assets/images/sample.png';

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
        // Assets.add({alias: 'pic1', src: sampleImage});
        Assets.add({alias: 'pic1', src: './assets/images/sample.png'});
        let texture2 = await Assets.load('pic1');
        const sprite2 = new Sprite(texture2);
        app.stage.addChild(sprite2);
        sprite2.x = app.screen.width / 3;
        sprite2.y = app.screen.height / 3;


        // Add a container to center our sprite stack on the page
        const container = new PIXI.Container({
            x:app.screen.width / 2,
            y:app.screen.height / 2,
        });

        app.stage.addChild(container);
        
        let container2 = new PIXI.Container();


// masking==================================

// Create window frame
let frame = new PIXI.Graphics({
  x:320 - 104,
  y:180 - 104
})
.rect(0, 0, 208, 208)
.fill(0x666666)
.stroke({ color: 0xffffff, width: 4, alignment: 0 })

app.stage.addChild(frame);

// Create a graphics object to define our mask
let mask = new PIXI.Graphics()
// Add the rectangular area to show
 .rect(0,0,200,200)
 .fill(0xffffff);

// Add container that will hold our masked content
let maskContainer = new PIXI.Container();
// Set the mask to use our graphics object from above
maskContainer.mask = mask;
// Add the mask as a child, so that the mask is positioned relative to its parent
maskContainer.addChild(mask);
// Offset by the window's frame width
maskContainer.position.set(4,4);
// And add the container to the window!
frame.addChild(maskContainer);

// Create contents for the masked container
let text = new PIXI.Text({
  text:'This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n' +
  'You can put anything in the container and it will be masked!',
  style:{
    fontSize: 24,
    fill: 0x1010ff,
    wordWrap: true,
    wordWrapWidth: 180
  },
  x:10
});

maskContainer.addChild(text);

// Add a ticker callback to scroll the text up and down
let elapsed2 = 0.0;
app.ticker.add((ticker) => {
  // Update the text's y coordinate to scroll it
  elapsed2 += ticker.deltaTime;
  text.y = 10 + -100.0 + Math.cos(elapsed2/50.0) * 100.0;
});

//交互-------------------------
bunny.on('pointerdown', (event) => { alert('clicked!'); });
bunny.eventMode = 'static';

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


