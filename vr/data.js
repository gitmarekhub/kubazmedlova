var APP_DATA = {
  "scenes": [
    {
      "id": "0-vstup",
      "name": "Vstup",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "yaw": 0.5043674623759706,
        "pitch": 0.1668133816668096,
        "fov": 1.4010588678110822
      },
      "linkHotspots": [
        {
          "yaw": 0.43224909189659044,
          "pitch": 0.6194998175905706,
          "rotation": 0,
          "target": "1-chodba"
        },
        {
          "yaw": 0.2629430014271925,
          "pitch": 0.3190381027078182,
          "rotation": 0,
          "target": "2-chodba---zrcadlo"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-chodba",
      "name": "Chodba",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -2.474733240228396,
          "pitch": 0.6660310477101223,
          "rotation": 0,
          "target": "0-vstup"
        },
        {
          "yaw": -0.010583481648298587,
          "pitch": 0.43804285838428214,
          "rotation": 0,
          "target": "2-chodba---zrcadlo"
        },
        {
          "yaw": 2.8012440575934923,
          "pitch": 0.6862129999285127,
          "rotation": 0,
          "target": "3-koupelna"
        },
        {
          "yaw": 1.4943995799301728,
          "pitch": 0.5695400062197997,
          "rotation": 0,
          "target": "5-lonice---vstup"
        },
        {
          "yaw": 0.566271097293713,
          "pitch": 0.5228720785527372,
          "rotation": 0,
          "target": "7-dtsk-pokoj"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-chodba---zrcadlo",
      "name": "Chodba - zrcadlo",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -3.0641144647741925,
          "pitch": 0.654898158443789,
          "rotation": 0,
          "target": "1-chodba"
        },
        {
          "yaw": -1.0312845594163562,
          "pitch": 0.7191665107939293,
          "rotation": 0,
          "target": "4-wc"
        },
        {
          "yaw": 2.125678013196783,
          "pitch": 0.7040697676258247,
          "rotation": 0,
          "target": "7-dtsk-pokoj"
        },
        {
          "yaw": -0.1657625397762068,
          "pitch": 0.35689131367658966,
          "rotation": 0,
          "target": "9-kuchyn"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-koupelna",
      "name": "Koupelna",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 3.0150284968854493,
          "pitch": 0.7063629860919463,
          "rotation": 0,
          "target": "1-chodba"
        },
        {
          "yaw": 3.069430927847904,
          "pitch": 0.33411368163709554,
          "rotation": 0,
          "target": "2-chodba---zrcadlo"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-wc",
      "name": "WC",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 1.543002728136801,
          "pitch": 0.818280795521293,
          "rotation": 0,
          "target": "2-chodba---zrcadlo"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-lonice---vstup",
      "name": "Ložnice - vstup",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.113083872284788,
          "pitch": 0.4100496359358914,
          "rotation": 0,
          "target": "6-lonice---sted"
        },
        {
          "yaw": -3.073548314578847,
          "pitch": 0.7268825608741665,
          "rotation": 0,
          "target": "1-chodba"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "6-lonice---sted",
      "name": "Ložnice - střed",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 1.6832858902443864,
          "pitch": 0.5956959749818029,
          "rotation": 0,
          "target": "5-lonice---vstup"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "7-dtsk-pokoj",
      "name": "Dětský pokoj",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 2.593763590786846,
          "pitch": 0.6162988566979237,
          "rotation": 0,
          "target": "1-chodba"
        },
        {
          "yaw": -0.31560179758708173,
          "pitch": 0.5818951476338405,
          "rotation": 0,
          "target": "8-dtsk-pokoj---sted"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "8-dtsk-pokoj---sted",
      "name": "Dětský pokoj - střed",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 2.8448076147244583,
          "pitch": 0.5053727006657986,
          "rotation": 0,
          "target": "7-dtsk-pokoj"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "9-kuchyn",
      "name": "Kuchyně",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -2.7483490232274086,
          "pitch": 0.6478768679387841,
          "rotation": 0,
          "target": "2-chodba---zrcadlo"
        },
        {
          "yaw": 1.1595069845692603,
          "pitch": 0.3659908925822517,
          "rotation": 0,
          "target": "10-obvk"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "10-obvk",
      "name": "Obývák",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1500,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 2.7669648670045683,
          "pitch": 0.43017417648472467,
          "rotation": 0,
          "target": "9-kuchyn"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Byt_3KK",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
