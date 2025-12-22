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
        "yaw": 0.39508710921897716,
        "pitch": 0.005232712858298072,
        "fov": 1.4010588678110822
      },
      "linkHotspots": [
        {
          "yaw": 0.4711446187165187,
          "pitch": 0.6260024927190138,
          "rotation": 0,
          "target": "1-chodba"
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
          "yaw": -2.4004581185803584,
          "pitch": 0.6722558682369488,
          "rotation": 0,
          "target": "0-vstup"
        },
        {
          "yaw": -0.023689358223387913,
          "pitch": 0.5042362458396568,
          "rotation": 0,
          "target": "2-zrcadlo"
        },
        {
          "yaw": 2.798672098145257,
          "pitch": 0.6835004642744487,
          "rotation": 0,
          "target": "3-koupelna"
        },
        {
          "yaw": 1.5128502099299332,
          "pitch": 0.574158086659768,
          "rotation": 0,
          "target": "5-lonice---vstup"
        },
        {
          "yaw": 0.5796575725133906,
          "pitch": 0.5984507687062166,
          "rotation": 0,
          "target": "7-dtsk-pokoj---vstup"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-zrcadlo",
      "name": "Zrcadlo",
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
          "yaw": -1.0339842288797705,
          "pitch": 0.7588074170127737,
          "rotation": 0,
          "target": "4-wc"
        },
        {
          "yaw": -2.985309176273333,
          "pitch": 0.7088997597487463,
          "rotation": 0,
          "target": "1-chodba"
        },
        {
          "yaw": -0.18116068991638912,
          "pitch": 0.3705990947228237,
          "rotation": 0,
          "target": "9-kuchyn"
        },
        {
          "yaw": 2.1028753521178682,
          "pitch": 0.6831719171612054,
          "rotation": 0,
          "target": "7-dtsk-pokoj---vstup"
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
        "yaw": -0.34776574577825414,
        "pitch": 0.10910229227913604,
        "fov": 1.4010588678110822
      },
      "linkHotspots": [
        {
          "yaw": 2.9954394401139215,
          "pitch": 0.6634219602555564,
          "rotation": 0,
          "target": "1-chodba"
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
        "yaw": -0.15791223769245732,
        "pitch": 0.5108457531548822,
        "fov": 1.4010588678110822
      },
      "linkHotspots": [
        {
          "yaw": 1.6928011774877119,
          "pitch": 0.8297149824151404,
          "rotation": 0,
          "target": "2-zrcadlo"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-lonice---vstup",
      "name": "Ložnice - Vstup",
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
          "yaw": -2.99262633177597,
          "pitch": 0.7161025967579508,
          "rotation": 0,
          "target": "1-chodba"
        },
        {
          "yaw": 0.12150898231311658,
          "pitch": 0.4294997510230303,
          "rotation": 0,
          "target": "6-lonice---sted"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "6-lonice---sted",
      "name": "Ložnice - Střed",
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
          "yaw": 1.6828686870685585,
          "pitch": 0.510260302662104,
          "rotation": 0,
          "target": "5-lonice---vstup"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "7-dtsk-pokoj---vstup",
      "name": "Dětský pokoj - Vstup",
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
          "yaw": 2.6624157262235446,
          "pitch": 0.6883043364369108,
          "rotation": 0,
          "target": "1-chodba"
        },
        {
          "yaw": -0.41089978375692127,
          "pitch": 0.47693151006668444,
          "rotation": 0,
          "target": "8-dtsk-pokoj---sted"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "8-dtsk-pokoj---sted",
      "name": "Dětský pokoj - Střed",
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
        "yaw": -0.4521948614710105,
        "pitch": -0.011773603931196419,
        "fov": 1.4010588678110822
      },
      "linkHotspots": [
        {
          "yaw": 2.821012599071997,
          "pitch": 0.537536507306033,
          "rotation": 0,
          "target": "7-dtsk-pokoj---vstup"
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
          "yaw": 1.1209676645628903,
          "pitch": 0.37505548915994424,
          "rotation": 0,
          "target": "10-obvk"
        },
        {
          "yaw": -2.9131466038012857,
          "pitch": 0.6951194482013605,
          "rotation": 0,
          "target": "2-zrcadlo"
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
          "yaw": 2.8342232576603177,
          "pitch": 0.3823554257155486,
          "rotation": 0,
          "target": "9-kuchyn"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
