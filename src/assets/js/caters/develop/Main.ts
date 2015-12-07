import Event = require('ex/events/Event');

class Main {
  //-  TreeConfig
  private _scene:any;
  private _camera:any;
  
  private _fov:number = 60;
  private _width:number = 1280;
  private _height:number = 1024;
  private _aspect:number = this._width/this._height;
  
  private _near:number = 1;
  private _far:number = 1000;
  private _renderer:any;
  private _renderingTimer:any;
  
  //-  ThreeObjects
  private _flatLight:any;
  private _texture:any;
  private _material:any;
  
  private _particleCount:number = 20000;
  private _particles:any;
  private _points:any;
  
  private _particles2:any;
  private _points2:any;
  
  private _spd:number = 2;
  
  constructor() {
    this.threeInit();
  }
  
  threeInit = ():void => {
    this._scene = new THREE.Scene();
    
    //- . . . . . . . . . . . . . . .  . . . init <
    this._camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, this._near, this._far);
    this._camera.position.set(0, 0, 200);
    this._renderer = new THREE.WebGLRenderer({antialias:true});
    this._renderer.setSize(this._width, this._height);
    this._renderer.setClearColor(new THREE.Color(0xffffff));
    this._scene.fog = new THREE.Fog(0xffffff, 10, 100);
    document.body.appendChild(this._renderer.domElement);
    this._renderingTimer = window.requestAnimFrame(this.rendering);
    
    this.addLight();
    this.addObj();
    
    this._renderer.setSize( window.innerWidth, window.innerHeight );
    window.addEventListener(Event.RESIZE, this.onResizeHD, false);
  }
  
  addObj = ():void => {
    this._texture = THREE.ImageUtils.loadTexture('blossom.png');
    this._material = new THREE.PointsMaterial({
      color : 0xffffff,
      size : 1,
      map : this._texture,
      transparent : true,
      side:THREE.DoubleSide
    });
    
    this._particles = new THREE.Geometry();
    this._particles2 = new THREE.Geometry();
    
    var i:number = 0;
    for (i=0; i<this._particleCount; i++) {
      var _px = Math.random() * 800 - 400;
      var _py = Math.random() * 800 - 400;
      var _pz = Math.random() * 800 - 400;
      
      var vertex = new THREE.Vector3();
      vertex.x = _px;
      vertex.y = _py;
      vertex.z = _pz;
      this._particles.vertices.push(vertex);
      this._particles2.vertices.push(vertex);
    }
    
    console.log(this._particles.vertices[0]);
    
    this._points = new THREE.Points(this._particles, this._material);
    this._points2 = new THREE.Points(this._particles, this._material);
    
    this._points.sortParticle = true;
    this._points2.sortParticle = true;
    
    this._scene.add(this._points);
    this._scene.add(this._points2);
  }
  
  addLight = ():void => {
    this._flatLight = new THREE.DirectionalLight(0xffffff, 1);
    this._flatLight.position.set(0, 0.7, 0.7);
    this._scene.add(this._flatLight);
  }
  
  carc = ():void => {
    this._points.rotation.y -= 0.005;
    // this._points2.rotation.y += 0.005;
    
    var _count = this._particleCount-1;
    
    while (_count) {
      var vertex = this._particles.vertices[_count];
      
      vertex.y -= 1;
      
      if (vertex.y < -200) {
        vertex.y = 200;
      }
      
      // _particle.add(particle.velocity);
      _count --;
    }
    this._points.geometry.verticesNeedUpdate = true;
  }
  
  rendering = ():void => {
    this.carc();
    this._renderer.render( this._scene, this._camera );
    this._renderingTimer = window.requestAnimFrame(this.rendering);
  }
  
  onResizeHD = ():void => {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }
}


export = Main;