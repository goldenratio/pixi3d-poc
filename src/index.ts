import * as PIXI from 'pixi.js';
import { CameraOrbitControl, Color, Cubemap, ImageBasedLighting, LightingEnvironment, Model } from 'pixi3d';

const app = new PIXI.Application({
	width: 600,
	height: 400,
	backgroundColor: 0x1099bb,
	sharedTicker: true,
});

// change the value to 1, model will appear
PIXI.settings.RESOLUTION = 2;

document.body.appendChild(app.view);

new CameraOrbitControl(app.view);

// setup lights
LightingEnvironment.main.imageBasedLighting = new ImageBasedLighting(
  Cubemap.fromColors(new Color(0.8, 0.8, 0.8, 1)),
  Cubemap.fromColors(new Color(0))
);

PIXI.Loader.shared.add('Soldier', './resources/Soldier.glb').load((_, resources) => {
  // @ts-ignore
  const model = Model.from(resources['Soldier'].gltf);
  model.animations[3].loop = true;
  model.animations[3].play();
  // @ts-ignore
	app.stage.addChild(model);
});
