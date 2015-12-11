import Event = require('ex/events/Event');


class Main {
  //-  TreeConfig
  private _scene:any;
  private _camera:any;
  
  private _fov:number = 60;
  private _width:number = 640;
  private _height:number = 480;
  private _aspect:number = this._width/this._height;
  
  private _near:number = 1;
  private _far:number = 1000;
  private _renderer:any;
  private _renderingTimer:any;
  
  //-  ThreeObjects
  private _flatLight:any;
  private _texture:any;
  private _material:any;
  
  private _particleCount:number = 100000;
  private _particles:any;
  private _points:any;
  
  private _spd:number = 2;
  private _ground:any;
  private _groundMaterial:any;
  private _groundMesh:any;
  private _cameraCount:number = 0;
  
  constructor() {
    this.threeInit();
  }
  
  threeInit = ():void => {
    this._scene = new THREE.Scene();
    
    //- . . . . . . . . . . . . . . .  . . . init <
    this._camera = new THREE.PerspectiveCamera(60, this._width / this._height, this._near, this._far);
    this._camera.position.set(0, 400, 0);
    this._camera.lookAt(new THREE.Vector3(0, 0, 0));
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    // console.log(this._camera.aspect);
    
    this._renderer = new THREE.WebGLRenderer({antialias:true});
    // this._renderer = new THREE.CanvasRenderer({antialias:false});
    
    this._renderer.setSize(this._width, this._height);
    this._renderer.setClearColor(new THREE.Color(0xa2b6bd));
    this._scene.fog = new THREE.Fog(0xffffff, 0, 400);
    document.body.appendChild(this._renderer.domElement);
    
    this._ground = new THREE.PlaneGeometry( 150, 150, 32, 32 );
    this._groundMaterial = new THREE.MeshBasicMaterial({color : 0x000000, wireframe:true} );
    this._groundMesh = new THREE.Mesh(this._ground, this._groundMaterial);
    this._groundMesh.rotation.x = Math.PI / -2;
    this._groundMesh.position.y = -50;
    this._scene.add(this._groundMesh);
    
    // this.addLight();
    this.addObj();
    
    this._renderer.setSize( window.innerWidth, window.innerHeight );
    window.addEventListener(Event.RESIZE, this.onResizeHD, false);
  }
  
  addObj = ():void => {
    var _self = this;
    this._texture = THREE.ImageUtils.loadTexture('blossom.png');
    _self.addObje2();
  }
  
  addObje2 = ():void => {
    this._material = new THREE.PointsMaterial({
      color : 0xffffff,
      size : 2,
      map : this._texture,
      transparent : true,
      blending : THREE.AdditiveBlending,
      side:THREE.DoubleSide
    });
    
    this._particles = new THREE.Geometry();
    
    var i:number = 0;
    for (i=0; i<this._particleCount; i++) {
      var _px = -400  + Math.random() * 800;
      var _py = -400  + Math.random() * 800;
      var _pz = -400  + Math.random() * 800;
      
      var vertex = new THREE.Vector3();
      vertex.x = _px;
      vertex.y = _py;
      vertex.z = _pz;
      vertex.spd = Math.random() * 0.5;
      this._particles.vertices.push(vertex);
    }
    
    // console.log(this._particles.vertices[0]);
    
    this._points = new THREE.Points(this._particles, this._material);
    this._points.sortParticle = true;
    
    this._scene.add(this._points);
    this._renderingTimer = window.requestAnimFrame(this.rendering);
  }
  
  addLight = ():void => {
    this._flatLight = new THREE.DirectionalLight(0xffffff, 1);
    this._flatLight.position.set(0, 0.7, 0.7);
    this._scene.add(this._flatLight);
  }
  
  carc = ():void => {
    this._points.rotation.y += 0.001;
    // this._points.rotation.x += 0.01;
    // this._points.rotation.z -= 0.01;
    var _count = this._particleCount-1;
    
    while (_count) {
      var vertex = this._particles.vertices[_count];
      vertex.y -= vertex.spd;
      if (vertex.y < -100) {
        vertex.x = -400  + Math.random() * 800;
        vertex.z = -400  + Math.random() * 800;
        vertex.y = 100;
      }
      _count --;
    }
    
    this._points.geometry.verticesNeedUpdate = true;
    this._cameraCount += 0.1;
    
    var _gotoX = 200 * Math.sin(this._cameraCount * Math.PI/180);
    var _gotoZ = 200 * Math.cos(this._cameraCount * Math.PI/180);
    
    // console.log(_gotoX, _gotoZ);
    var _gotoY = 200;
    // this._camera.position.set(_gotoX, _gotoY, _gotoZ);
    
    // this._camera.lookAt(0, 0, 0);
    // this._camera.position.x = _gotoX;
    this._camera.position.x = _gotoX;
    this._camera.position.z = _gotoZ;
    this._camera.position.y = 50;
    this._camera.lookAt(new THREE.Vector3(0, 0, 0));
    this._camera.updateProjectionMatrix();
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