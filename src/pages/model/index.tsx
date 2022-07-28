import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as dat from 'dat.gui';
import {
  cameraConfig,
  pointLightConfig,
  directionLightConfig,
  directionLightConfig1,
} from './config';

function Test() {
  const { rotation, scale, position } = cameraConfig;
  const dlSettings = directionLightConfig;
  const dlSettings1 = directionLightConfig1;
  const plSettings = pointLightConfig;
  const viewport = { left: -10, right: 10, top: 5, bottom: -8 };
  const height = window.innerHeight * 0.95;
  const width = height * 1.2;
  const containerRef = useRef(null);
  //3d test
  const init3D = () => {
    let model: any, scene: any, camera: any, renderer: any;
    let mixer: any, control: any;
    let dirLight: any, dirLight1: any, ptLight: any;
    let gridHelper: any,
      dirLightHelper: any,
      dirLightHelper1: any,
      ptLightHelper: any;
    let settings: any;
    let times = 0;
    let actions: any = {};
    const clock = new THREE.Clock();
    const gui = new dat.GUI({ width: 310 });
    const fps = 30,
      size = 10,
      divisions = 10;
    const renderT = 1 / fps;

    const initScene = () => {
      scene = new THREE.Scene();
      scene.background = 'transparent';
      gridHelper = new THREE.GridHelper(size, divisions);
      if (position.helper) {
        scene.add(gridHelper);
      }
    };

    const initLight = () => {
      ptLight = new THREE.PointLight(plSettings.color, 1, 100);
      ptLight.power = plSettings.power;
      ptLight.position.set(
        plSettings.position.x,
        plSettings.position.y,
        plSettings.position.z
      );
      // 面光
      dirLight = new THREE.DirectionalLight(
        dlSettings.color,
        dlSettings.intensity
      );
      dirLight.castShadow = dlSettings.castShadow;
      dirLight.shadow.bias = -0.001;
      dirLight.position.set(
        dlSettings.position.x,
        dlSettings.position.y,
        dlSettings.position.z
      );
      dirLight.rotation.set(
        dlSettings.rotation.x,
        dlSettings.rotation.y,
        dlSettings.rotation.z
      );
      // 面光1
      dirLight1 = new THREE.DirectionalLight(
        dlSettings1.color,
        dlSettings1.intensity
      );
      dirLight1.castShadow = dlSettings1.castShadow;
      dirLight1.shadow.bias = -0.001;
      dirLight1.position.set(
        dlSettings1.position.x,
        dlSettings1.position.y,
        dlSettings1.position.z
      );
      dirLight1.rotation.set(
        dlSettings1.rotation.x,
        dlSettings1.rotation.y,
        dlSettings1.rotation.z
      );
      dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 3);
      dirLightHelper1 = new THREE.DirectionalLightHelper(dirLight1, 3);
      ptLightHelper = new THREE.PointLightHelper(
        ptLight,
        plSettings.sphereSize
      );
      if (dlSettings.open) {
        scene.add(dirLight);
        if (dlSettings.helper) {
          scene.add(dirLightHelper);
        }
      }
      if (dlSettings1.open) {
        scene.add(dirLight1);
        if (dlSettings1.helper) {
          scene.add(dirLightHelper1);
        }
      }
      if (plSettings.open) {
        scene.add(ptLight);
        if (plSettings.helper) {
          scene.add(ptLightHelper);
        }
      }
    };

    const initCamera = () => {
      camera = new THREE.OrthographicCamera(
        viewport.left,
        viewport.right,
        viewport.top,
        viewport.bottom,
        -10,
        1000
      );
      camera.position.set(position.x, position.y, position.z);
      camera.scale.set(scale.x, scale.y, scale.z);
      scene.add(camera);
    };

    const initRenderer = () => {
      // 渲染器设置透明背景
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      // GLTFLoader将可以正确地自动配置从.gltf或.glb文件中引用的纹理
      renderer.outputEncoding = THREE.sRGBEncoding;
      //色调映射的曝光级别
      renderer.toneMappingExposure = 0.7;
      renderer.setClearAlpha(0);
      renderer.setPixelRatio(window.devicePixelRatio);
      // 渲染器尺寸
      renderer.setSize(width, height);
      // 挂载渲染器
      (containerRef.current as any).appendChild(renderer.domElement);
    };

    const initModel = () => {
      const gltfLoader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      dracoLoader.setDecoderConfig({ type: 'js' });
      dracoLoader.preload();
      gltfLoader.setDRACOLoader(dracoLoader);
      gltfLoader.load(
        window.location.origin + `/login_background.glb`,
        (obj: any) => {
          model = obj.scene;
          console.log(model);
          mixer = new THREE.AnimationMixer(model);
          model.traverse((item: any) => {
            if (item.isMesh) {
              item.castShadow = true;
              item.receiveShadow = true;
              item.material.shininess = 10;
              item.material.refractionRatio = 1;
              item.material.reflectivity = 1;
              // item.material.emissiveMap = item.material.map;
              item.material.metalness = 0.191;
              item.material.roughness = 0.595;
            }
          });
          scene.add(model);
          obj.animations.forEach((clip: any) => {
            //播放
            let action = mixer.clipAction(clip);
            action.play();
            // 所有动画加入动画列表，方便gui手动控制
            actions[clip.name] = action;
          });
        },
        undefined,
        (error: any) => {
          console.log('load error', error);
        }
      );
    };

    const initControl = () => {
      control = new OrbitControls(camera, renderer.domElement);
      control.object.rotation.x = rotation.x;
      control.object.rotation.y = rotation.y;
      control.object.rotation.z = rotation.z;
      control.object.zoom = scale.zoom;
      control.enableRotate = rotation.enableRotate;
      control.enableZoom = scale.enableZoom;
      control.enablePan = position.enablePan;
      control.addEventListener('change', () => {
        // 待解决：change 时会触发control.update()，导致control.object.rotation(camera.rotation)重置，模型会卡一下
        // 不设置rotation值如何调整模型的摆放角度？
        //gui 双向控制
        gui.__folders['缩放'].__controllers.forEach(
          (controller: any, index: number) => {
            if (controller.setValue) {
              if (index === 4) {
                controller.setValue(control.object.zoom);
              }
            }
          }
        );
        gui.__folders['旋转'].__controllers.forEach(
          (controller: any, index: number) => {
            if (controller.setValue) {
              if (index === 0) {
                controller.setValue(control.object.rotation.x);
              }
              if (index === 1) {
                controller.setValue(control.object.rotation.y);
              }
              if (index === 2) {
                controller.setValue(control.object.rotation.z);
              }
            }
          }
        );
        gui.__folders['平移'].__controllers.forEach(
          (controller: any, index: number) => {
            if (controller.setValue) {
              if (index === 0) {
                controller.setValue(control.object.position.x);
              }
              if (index === 1) {
                controller.setValue(control.object.position.y);
              }
              if (index === 2) {
                controller.setValue(control.object.position.z);
              }
            }
          }
        );
      });
    };

    const initGUI = () => {
      const folder4 = gui.addFolder('平行光');
      const folder6 = gui.addFolder('平行光1');
      const folder5 = gui.addFolder('点光源');
      const folder2 = gui.addFolder('旋转');
      const folder3 = gui.addFolder('平移');
      const folder1 = gui.addFolder('缩放');
      const folder7 = gui.addFolder('动画');
      folder4.open();
      // 还原gui设置
      const resetGui = (folder: string) => {
        gui.__folders[folder].__controllers.forEach((controller: any) => {
          if ('initialValue' in controller && controller.setValue) {
            controller.setValue(controller.initialValue);
            renderer.render(scene, camera);
          }
        });
      };
      settings = {
        '缩放 x': camera.scale.x,
        '缩放 y': camera.scale.y,
        '缩放 z': camera.scale.z,
        开启整体缩放: scale.enableZoom,
        整体缩放: control.object.zoom,
        全部复位: () => resetGui('缩放'),
        '旋转 x': control.object.rotation.x,
        '旋转 y': control.object.rotation.y,
        '旋转 z': control.object.rotation.z,
        开启旋转: rotation.enableRotate,
        复位旋转: () => resetGui('旋转'),
        '平移 x': camera.position.x,
        '平移 y': camera.position.y,
        '平移 z': camera.position.z,
        开启坐标轴: position.helper,
        开启平移: position.enablePan,
        复位平移: () => resetGui('平移'),
        '平行光旋转 x': dirLight.rotation.x,
        '平行光旋转 y': dirLight.rotation.y,
        '平行光旋转 z': dirLight.rotation.z,
        '平行光位置 x': dirLight.position.x,
        '平行光位置 y': dirLight.position.y,
        '平行光位置 z': dirLight.position.z,
        平行光强度: dirLight.intensity,
        平行光颜色: dirLight.color.getHex(),
        平行光辅助器: dlSettings.open ? dlSettings.helper : false,
        开启平行光: dlSettings.open,
        复位平行光: () => resetGui('平行光'),
        '点光源位置 x': ptLight.position.x,
        '点光源位置 y': ptLight.position.y,
        '点光源位置 z': ptLight.position.z,
        点光源强度: ptLight.power,
        点光源颜色: ptLight.color.getHex(),
        点光源辅助器: plSettings.open ? plSettings.helper : false,
        开启点光源: plSettings.open,
        复位点光源: () => resetGui('点光源'),
        '平行光1旋转 x': dirLight1.rotation.x,
        '平行光1旋转 y': dirLight1.rotation.y,
        '平行光1旋转 z': dirLight1.rotation.z,
        '平行光1位置 x': dirLight1.position.x,
        '平行光1位置 y': dirLight1.position.y,
        '平行光1位置 z': dirLight1.position.z,
        平行光1强度: dirLight1.intensity,
        平行光1颜色: dirLight1.color.getHex(),
        平行光1辅助器: dlSettings1.open ? dlSettings1.helper : false,
        开启平行光1: dlSettings1.open,
        复位平行光1: () => resetGui('平行光1'),
        关闭所有: () => {
          mixer.stopAllAction();
        },
        开启所有: () => {
          Object.keys(actions).map((clip) => {
            actions[clip].play();
          });
        },
        暂停: false,
        下一帧: false,
      };
      // 缩放 -创建有滑块的控制板 ..., min,max,精度
      folder1
        .add(settings, '缩放 x', scale.min, scale.max, scale.step)
        .onChange((val) => {
          camera.scale.x = val;
        });
      folder1
        .add(settings, '缩放 y', scale.min, scale.max, scale.step)
        .onChange((val) => {
          camera.scale.y = val;
        });
      folder1
        .add(settings, '缩放 z', scale.min, scale.max, scale.step)
        .onChange((val) => {
          camera.scale.z = val;
        });
      folder1.add(settings, '开启整体缩放').onChange((val) => {
        control.enableZoom = val;
      });
      folder1.add(settings, '整体缩放', 0, 10, 0.01).onChange((val) => {
        // 待解决： 改变zoom 场景并不生效
        control.object.zoom = val;
      });
      folder1.add(settings, '全部复位');
      // 旋转
      folder2
        .add(settings, '旋转 x', rotation.min, rotation.max, rotation.step)
        .onChange((val) => {
          control.object.rotation.x = val;
        });
      folder2
        .add(settings, '旋转 y', rotation.min, rotation.max, rotation.step)
        .onChange((val) => {
          camera.rotation.y = val;
        });
      folder2
        .add(settings, '旋转 z', rotation.min, rotation.max, rotation.step)
        .onChange((val) => {
          camera.rotation.z = val;
        });
      folder2.add(settings, '开启旋转').onChange((val) => {
        control.enableRotate = val;
      });
      folder2.add(settings, '复位旋转');
      // 平移
      folder3
        .add(settings, '平移 x', position.min, position.max, position.step)
        .onChange((val) => {
          camera.position.x = val;
        });
      folder3
        .add(settings, '平移 y', position.min, position.max, position.step)
        .onChange((val) => {
          camera.position.y = val;
        });
      folder3
        .add(settings, '平移 z', position.min, position.max, position.step)
        .onChange((val) => {
          camera.position.z = val;
        });
      folder3.add(settings, '开启坐标轴').onChange((val) => {
        if (val) {
          scene.add(gridHelper);
        } else {
          scene.remove(gridHelper);
        }
      });
      folder3.add(settings, '开启平移').onChange((val) => {
        control.enablePan = val;
      });
      folder3.add(settings, '复位平移');
      // 平行光
      folder4
        .add(
          settings,
          '平行光旋转 x',
          dlSettings.min,
          dlSettings.max,
          dlSettings.step
        )
        .onChange((val) => {
          dirLight.rotation.x = val;
        });
      folder4
        .add(
          settings,
          '平行光旋转 y',
          dlSettings.min,
          dlSettings.max,
          dlSettings.step
        )
        .onChange((val) => {
          dirLight.rotation.y = val;
        });
      folder4
        .add(
          settings,
          '平行光旋转 z',
          dlSettings.min,
          dlSettings.max,
          dlSettings.step
        )
        .onChange((val) => {
          dirLight.rotation.z = val;
        });
      folder4
        .add(
          settings,
          '平行光位置 x',
          dlSettings.min,
          dlSettings.max,
          dlSettings.step
        )
        .onChange((val) => {
          dirLight.position.x = val;
        });
      folder4
        .add(
          settings,
          '平行光位置 y',
          dlSettings.min,
          dlSettings.max,
          dlSettings.step
        )
        .onChange((val) => {
          dirLight.position.y = val;
        });
      folder4
        .add(
          settings,
          '平行光位置 z',
          dlSettings.min,
          dlSettings.max,
          dlSettings.step
        )
        .onChange((val) => {
          dirLight.position.z = val;
        });
      folder4.add(settings, '平行光强度', 0, 10, 0.01).onChange((val) => {
        dirLight.intensity = val;
      });
      folder4.addColor(settings, '平行光颜色').onChange((val) => {
        dirLight.color.setHex(val);
      });
      folder4.add(settings, '平行光辅助器').onChange((val) => {
        if (val) {
          scene.add(dirLightHelper);
        } else {
          scene.remove(dirLightHelper);
        }
      });
      folder4.add(settings, '开启平行光').onChange((val) => {
        if (val) {
          scene.add(dirLight);
          scene.add(dirLightHelper);
        } else {
          scene.remove(dirLightHelper);
          scene.remove(dirLight);
        }
      });
      folder4.add(settings, '复位平行光');
      // 点光源
      folder5
        .add(
          settings,
          '点光源位置 x',
          plSettings.min,
          plSettings.max,
          plSettings.step
        )
        .onChange((val) => {
          ptLight.position.x = val;
        });
      folder5
        .add(
          settings,
          '点光源位置 y',
          plSettings.min,
          plSettings.max,
          plSettings.step
        )
        .onChange((val) => {
          ptLight.position.y = val;
        });
      folder5
        .add(
          settings,
          '点光源位置 z',
          plSettings.min,
          plSettings.max,
          plSettings.step
        )
        .onChange((val) => {
          ptLight.position.z = val;
        });
      folder5.add(settings, '点光源强度', 0, 20, 0.01).onChange((val) => {
        ptLight.power = val;
      });
      folder5.addColor(settings, '点光源颜色').onChange((val) => {
        ptLight.color.setHex(val);
      });
      folder5.add(settings, '点光源辅助器').onChange((val) => {
        if (val) {
          scene.add(ptLightHelper);
        } else {
          scene.remove(ptLightHelper);
        }
      });
      folder5.add(settings, '开启点光源').onChange((val) => {
        if (val) {
          scene.add(ptLight);
          if (plSettings.helper) {
            scene.add(ptLightHelper);
          }
        } else {
          scene.remove(ptLight);
          scene.remove(ptLightHelper);
        }
      });
      folder5.add(settings, '复位点光源');
      // 平行光
      folder6
        .add(
          settings,
          '平行光1旋转 x',
          dlSettings1.min,
          dlSettings1.max,
          dlSettings1.step
        )
        .onChange((val) => {
          dirLight1.rotation.x = val;
        });
      folder6
        .add(
          settings,
          '平行光1旋转 y',
          dlSettings1.min,
          dlSettings1.max,
          dlSettings1.step
        )
        .onChange((val) => {
          dirLight1.rotation.y = val;
        });
      folder6
        .add(
          settings,
          '平行光1旋转 z',
          dlSettings1.min,
          dlSettings1.max,
          dlSettings1.step
        )
        .onChange((val) => {
          dirLight1.rotation.z = val;
        });
      folder6
        .add(
          settings,
          '平行光1位置 x',
          dlSettings1.min,
          dlSettings1.max,
          dlSettings1.step
        )
        .onChange((val) => {
          dirLight1.position.x = val;
        });
      folder6
        .add(
          settings,
          '平行光1位置 y',
          dlSettings1.min,
          dlSettings1.max,
          dlSettings1.step
        )
        .onChange((val) => {
          dirLight1.position.y = val;
        });
      folder6
        .add(
          settings,
          '平行光1位置 z',
          dlSettings1.min,
          dlSettings1.max,
          dlSettings1.step
        )
        .onChange((val) => {
          dirLight1.position.z = val;
        });
      folder6.add(settings, '平行光1强度', 0, 10, 0.01).onChange((val) => {
        dirLight1.intensity = val;
      });
      folder6.addColor(settings, '平行光1颜色').onChange((val) => {
        dirLight1.color.setHex(val);
      });
      folder6.add(settings, '平行光1辅助器').onChange((val) => {
        if (val) {
          scene.add(dirLightHelper1);
        } else {
          scene.remove(dirLightHelper1);
        }
      });
      folder6.add(settings, '开启平行光1').onChange((val) => {
        if (val) {
          scene.add(dirLight1);
          scene.add(dirLightHelper1);
        } else {
          scene.remove(dirLightHelper1);
          scene.remove(dirLight1);
        }
      });
      folder6.add(settings, '复位平行光1');
      //动画
      folder7.add(settings, '关闭所有');
      folder7.add(settings, '开启所有');
      folder7.add(settings, '暂停').onChange((val) => {
        Object.keys(actions).map((clip) => {
          actions[clip].paused = val;
        });
      });
    };

    const animate = () => {
      requestAnimationFrame(animate);
      let time = clock.getDelta();
      times = times + time;
      if (mixer && times > renderT) {
        // 推进混合器时间并更新动画
        // 通常在渲染循环中完成, 传入按照混合器的时间比例(timeScale)缩放过的clock.getDelta
        mixer.update(time);
        renderer.render(scene, camera);
        times = 0;
      }
    };

    const reSize = () => {
      const resizeHeight = window.innerHeight * 0.95;
      const reszeWidth = resizeHeight * 1.2;
      camera.updateProjectionMatrix();
      renderer.setSize(reszeWidth, resizeHeight);
    };

    initScene();
    initLight();
    initCamera();
    initRenderer();
    initModel();
    initControl();
    animate();
    initGUI();

    return [reSize, scene, renderer, camera, control, mixer];
  };

  useEffect(() => {
    const [resizeFunction, scene, renderer, control, mixer] = init3D();
    window.addEventListener('resize', resizeFunction, false);
    return () => {
      window.removeEventListener('resize', resizeFunction);
      control.removeEventListener('change');
      scene.clear();
      mixer.uncacheClip();
      mixer.uncaheRoot();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.content = null;
      // cancelAnimationFrame(0); // 去除animationFrame
      const gl = renderer.domElement.getContext('webgl');
      gl && gl.getExtension('WEBGL_lose_context').loseContext();
    };
  }, []);

  return (
    <>
      <div className="demo_wrapper" id="canvas-frame" ref={containerRef}></div>
    </>
  );
}

export default Test;
