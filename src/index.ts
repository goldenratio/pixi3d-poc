import * as PIXI from 'pixi.js';
import {
  CameraOrbitControl, Color, Cubemap, ImageBasedLighting,
  LightingEnvironment,
  Mesh3D, StandardMaterial, StandardMaterialTexture, TextureTransform,
} from 'pixi3d';

const app = new PIXI.Application({
	width: 800,
	height: 600,
	backgroundColor: 0x1099bb,
	sharedTicker: true,
});

document.body.appendChild(app.view);

const camera = new CameraOrbitControl(app.view);
window['camera'] = camera;

// setup lights
const ibl = new ImageBasedLighting(
  Cubemap.fromColors(new Color(0.8,0.8,0.8, 1)),
  Cubemap.fromColors(new Color(1,1,1, 1))
);
LightingEnvironment.main.imageBasedLighting = ibl;

PIXI.Loader.shared
  .add('Soldier', './resources/Soldier.glb')
  .add('BlocksBaseColor', './resources/blocks-basecolor.jpg')
  .add('BlocksNormal', './resources/blocks-normal.jpg')
  .add('OcclusionTexture', './resources/blocks-ambientocclusion.jpg')
  .add('RoughnessTexture', './resources/blocks-roughness.jpg')
  .add('HeightTexture', './resources/blocks-height.jpg')
  .load((_, resources) => {
    const baseTexture = new StandardMaterialTexture(PIXI.Texture.from('BlocksBaseColor').baseTexture);
    baseTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    baseTexture.transform = TextureTransform.fromTexture(PIXI.Texture.from('BlocksBaseColor'));

    const normalTexture = new StandardMaterialTexture(PIXI.Texture.from('BlocksNormal').baseTexture);
    normalTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    normalTexture.transform = TextureTransform.fromTexture(PIXI.Texture.from('BlocksNormal'));

    const material = new StandardMaterial();
    material.baseColorTexture = baseTexture;
    material.normalTexture = normalTexture;

    const obj = Mesh3D.createPlane(material);

    // @ts-ignore
    console.log(obj.material.baseColorTexture.transform);
    // @ts-ignore
    app.stage.addChild(obj);

    // let rotation = 0;
    let t = 0;
    app.ticker.add(() => {
      t++;
      baseTexture.transform.offset.set( Math.sin(t/100), Math.sin(t/100) );
      normalTexture.transform.offset.set( Math.sin(t/100), Math.sin(t/100) );
    });
});
