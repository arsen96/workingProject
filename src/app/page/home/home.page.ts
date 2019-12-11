import { Component, ElementRef, ViewChild } from "@angular/core";
import * as BABYLON from 'babylonjs';
import { _BabylonLoaderRegistered } from 'babylonjs';
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
// import { Platform, DomController } from '@ionic/angular';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  scene: BABYLON.Scene;
  constructor() {
  }
  screenOrientation: ScreenOrientation

  ionViewWillEnter(){
    
  //   if (!this.engine) {
  //     this.engine = new BABYLON.Engine(<HTMLCanvasElement> <unknown>this.canvas.nativeElement, true, {preserveDrawingBuffer: true, stencil: true});
  //   };
  //   if (!this.scene) {
  //     this.scene = this.createScene();
  //   };
  //   let scene = this.scene;
  //   this.engine.runRenderLoop(function () {
  //     if (scene) {
  //         scene.render();
  //     }
  // });
  }

  @ViewChild('canvas_box', { static: true }) canvas:ElementRef;

  engine: BABYLON.Engine ;

  public createScene() {
    var scene = new BABYLON.Scene(this.engine);
    var light = new BABYLON.DirectionalLight(
      "dir01",
      new BABYLON.Vector3(0, -0.5, -1.0),
      scene
    );
    var camera = new BABYLON.ArcRotateCamera(
      'Camera',
      0,
      0,
      10,
      new BABYLON.Vector3(0, 30, 0),
      scene
    );

    camera.attachControl(this.canvas.nativeElement as unknown as HTMLCanvasElement, false);
    camera.setPosition(new BABYLON.Vector3(20, 70, 120));
    light.position = new BABYLON.Vector3(50, 250, 200);
    light.shadowOrthoScale = 2.0;
    camera.minZ = 1.0;

    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    // Ground
    var ground = BABYLON.Mesh.CreateGround(
      "ground",
      1000,
      1000,
      1,
      scene,
      false
    );
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMaterial;
    ground.receiveShadows = true;

    // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.useBlurExponentialShadowMap = true;

    // Dude
    BABYLON.SceneLoader.ImportMesh(
      "him",
      "/assets/scenes/",
      "Dude.babylon",
      scene,
      function(newMeshes2, particleSystems2, skeletons2) {
        var dude = newMeshes2[0];

        for (var index = 1; index < newMeshes2.length; index++) {
          shadowGenerator.getShadowMap().renderList.push(newMeshes2[index]);
        }

        for (var count = 0; count < 50; count++) {
          var offsetX = 200 * Math.random() - 100;
          var offsetZ = 200 * Math.random() - 100;
          for (index = 1; index < newMeshes2.length; index++) {
            var instance = (newMeshes2[index] as BABYLON.Mesh).createInstance("instance" + count);

            shadowGenerator.getShadowMap().renderList.push(instance);

            instance.parent = newMeshes2[index].parent;
            instance.position = newMeshes2[index].position.clone();

            if (!(instance.parent as BABYLON.Mesh).subMeshes) {
              instance.position.x += offsetX;
              instance.position.z -= offsetZ;
            }
          }
        }

        dude.rotation.y = Math.PI;
        dude.position = new BABYLON.Vector3(0, 0, -80);

        scene.beginAnimation(skeletons2[0], 0, 100, true, 1.0);
      }
    );

    return scene;
  }

  // screen orientation
  // get current
// console.log(this.screenOrientation.type);
 // logs the current orientation, example: 'landscape'

// set to landscape
// this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

// allow user rotate
// this.screenOrientation.unlock();

// detect orientation changes

// this.engine.resize() -->
//   this.screenOrientation.onChange().subscribe(
//     () => {
//         console.log("Orientation Changed");
//     }
//  );

}
