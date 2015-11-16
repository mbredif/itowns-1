/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define('Globe/Atmosphere',['Renderer/NodeMesh','THREE','text!Renderer/Shader/GlowFS.glsl','text!Renderer/Shader/GlowVS.glsl'], function(NodeMesh,THREE,GlowFS,GlowVS){

    function Atmosphere(){
        
        NodeMesh.call( this );
        
        this.uniformsOut  = 
        {                        
            atmoIN  : { type: "i" , value: 0 },
            screenSize: {type: "v2", value: new THREE.Vector2(window.innerWidth,window.innerHeight)} // Should be updated on screen resize...
        };
        
        this.material = new THREE.ShaderMaterial( {
	
            uniforms        : this.uniformsOut,
            vertexShader    : GlowVS,
            fragmentShader  : GlowFS,
            side            : THREE.BackSide,
            blending        : THREE.AdditiveBlending,
            transparent     : true

        } );
                
        this.geometry       = new THREE.SphereGeometry( 7300000, 64, 64 );
        
        this.uniformsIn  = 
        {                        
            atmoIN  : { type: "i" , value: 1 },
            screenSize: {type: "v2", value: new THREE.Vector2(window.innerWidth,window.innerHeight)} // Should be updated on screen resize...
        };
        
        var materialAtmoIn = new THREE.ShaderMaterial( {
	
            uniforms        : this.uniformsIn,
            vertexShader    : GlowVS,
            fragmentShader  : GlowFS,
            side            : THREE.FrontSide,
            blending        : THREE.AdditiveBlending,
            transparent     : true

        } );
        
        var atmosphereIN    = new THREE.Mesh(new THREE.SphereGeometry( 6400000, 64, 64 ),materialAtmoIn);
        
        this.add(atmosphereIN);
        
        this.add(new THREE.Mesh(new THREE.SphereGeometry(6300000, 32, 32 ), new THREE.MeshBasicMaterial({color : 0x4B683A})));
        
    }
    
    Atmosphere.prototype = Object.create( NodeMesh.prototype );
    
    Atmosphere.prototype.constructor = Atmosphere;

    return Atmosphere;

});