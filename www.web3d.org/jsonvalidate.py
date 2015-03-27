import json

json.loads('''{
  "#comment": "Example scene to illustrate X3D nodes and fields (XML elements and attributes)",
  "Group": [
  {
    "@bboxCenter": [ 0, 0, 0 ],
    "@bboxSize": [ -1, -1, -1 ],
    "@containerField": "children",
    "Viewpoint": {
      "@DEF": "ViewUpClose",
      "@centerOfRotation": [ 0, -1, 0 ],
      "@description": "Hello world!",
      "@position": [ 0, -1, 7 ],
      "@fieldOfView": 0.7854,
      "@jump": true,
      "@orientation": [ 0, 0, 1, 0 ],
      "@retainUserOffsets": false,
      "@containerField": "children"
    },
    "Transform": [
    {
      "@rotation": [ 0, 1, 0, 3 ],
      "@center": [ 0, 0, 0 ],
      "@scale": [ 1, 1, 1 ],
      "@scaleOrientation": [ 0, 0, 1, 0 ],
      "@translation": [ 0, 0, 0 ],
      "@bboxCenter": [ 0, 0, 0 ],
      "@bboxSize": [ -1, -1, -1 ],
      "@containerField": "children",
      "Shape": [
      {
        "@containerField": "children",
        "@bboxCenter": [ 0, 0, 0 ],
        "@bboxSize": [ -1, -1, -1 ],
        "Sphere": {
          "@radius": 1,
          "@solid": true,
          "@containerField": "geometry"
        },
        "Appearance": [
        {
          "@containerField": "appearance",
          "Material": {
            "@DEF": "MaterialLightBlue",
            "@diffuseColor": [ 0.1, 0.5, 1 ],
            "@ambientIntensity": 0.2,
            "@emissiveColor": [ 0, 0, 0 ],
            "@shininess": 0.2,
            "@specularColor": [ 0, 0, 0 ],
            "@transparency": 0,
            "@containerField": "material"
          },
          "ImageTexture": {
            "@DEF": "ImageCloudlessEarth",
            "@url": [ "earth-topo.png", "earth-topo.jpg", "earth-topo-small.gif", "http://www.web3d.org/x3d/content/examples/Basic/earth-topo.png", "http://www.web3d.org/x3d/content/examples/Basic/earth-topo.jpg", "http://www.web3d.org/x3d/content/examples/Basic/earth-topo-small.gif" ],
            "@repeatS": true,
            "@repeatT": true,
            "@containerField": "texture"
          }
        }
        ]
      }
      ]
    }
    ],
    "Transform": [
    {
      "@translation": [ 0, -2, 0 ],
      "@center": [ 0, 0, 0 ],
      "@rotation": [ 0, 0, 1, 0 ],
      "@scale": [ 1, 1, 1 ],
      "@scaleOrientation": [ 0, 0, 1, 0 ],
      "@bboxCenter": [ 0, 0, 0 ],
      "@bboxSize": [ -1, -1, -1 ],
      "@containerField": "children",
      "Shape": [
      {
        "@containerField": "children",
        "@bboxCenter": [ 0, 0, 0 ],
        "@bboxSize": [ -1, -1, -1 ],
        "Text": [
        {
          "@DEF": "TextMessage",
          "@string": [ "Hello", "world!" ],
          "@maxExtent": 0.0,
          "@solid": false,
          "@containerField": "geometry",
          "FontStyle": {
            "@justify": [ "MIDDLE", "MIDDLE" ],
            "@family": [ "SERIF" ],
            "@horizontal": true,
            "@leftToRight": true,
            "@size": 1.0,
            "@spacing": 1.0,
            "@style": "PLAIN",
            "@topToBottom": true,
            "@containerField": "fontStyle"
          }
        }
        ],
        "Appearance": [
        {
          "@containerField": "appearance",
          "Material": {
            "@USE": "MaterialLightBlue",
            "@ambientIntensity": 0.2,
            "@diffuseColor": [ 0.8, 0.8, 0.8 ],
            "@emissiveColor": [ 0, 0, 0 ],
            "@shininess": 0.2,
            "@specularColor": [ 0, 0, 0 ],
            "@transparency": 0,
            "@containerField": "material"
          }
        }
        ]
      }
      ]
    }
    ]
  }
  ]
}''')
