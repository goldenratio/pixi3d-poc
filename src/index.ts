import * as PIXI from 'pixi.js';
import { Model } from 'pixi3d';

const app = new PIXI.Application({
	width: 600,
	height: 400,
	backgroundColor: 0x1099bb,
	resolution: window.devicePixelRatio || 1,
	sharedTicker: true,
});

document.body.appendChild(app.view);

PIXI.Loader.shared
	.add('barramundi-fish', './resources/barramundi-fish.glb')
	.load((_, resources) => {
	  // this fails
		// @ts-ignore
    app.stage.addChild(Model.from(resources['barramundi-fish'].gltf));

    // this works
    // setTimeout(() => {
    //   // @ts-ignore
    //   app.stage.addChild(Model.from(resources['barramundi-fish'].gltf));
    // }, 100);
	});
