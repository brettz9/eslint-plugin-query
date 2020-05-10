'use strict';

exports.functionAST = `{
  "type": "FunctionDeclaration",
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 1,
      "column": 20
    }
  },
  "range": [
    0,
    20
  ],
  "id": {
    "type": "Identifier",
    "loc": {
      "start": {
        "line": 1,
        "column": 9
      },
      "end": {
        "line": 1,
        "column": 10
      }
    },
    "range": [
      9,
      10
    ],
    "name": "a",
    "parent": "[Circular]"
  },
  "params": [
    {
      "type": "Identifier",
      "loc": {
        "start": {
          "line": 1,
          "column": 12
        },
        "end": {
          "line": 1,
          "column": 13
        }
      },
      "range": [
        12,
        13
      ],
      "name": "b",
      "parent": "[Circular]"
    },
    {
      "type": "Identifier",
      "loc": {
        "start": {
          "line": 1,
          "column": 15
        },
        "end": {
          "line": 1,
          "column": 16
        }
      },
      "range": [
        15,
        16
      ],
      "name": "c",
      "parent": "[Circular]"
    }
  ],
  "body": {
    "type": "BlockStatement",
    "loc": {
      "start": {
        "line": 1,
        "column": 18
      },
      "end": {
        "line": 1,
        "column": 20
      }
    },
    "range": [
      18,
      20
    ],
    "body": [],
    "parent": "[Circular]"
  },
  "expression": false,
  "generator": false,
  "parent": {
    "type": "Program",
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 1,
        "column": 20
      }
    },
    "range": [
      0,
      20
    ],
    "body": [
      "[Circular]"
    ],
    "sourceType": "script",
    "comments": [],
    "tokens": [
      {
        "type": "Keyword",
        "value": "function",
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 8
          }
        },
        "range": [
          0,
          8
        ]
      },
      {
        "type": "Identifier",
        "value": "a",
        "loc": {
          "start": {
            "line": 1,
            "column": 9
          },
          "end": {
            "line": 1,
            "column": 10
          }
        },
        "range": [
          9,
          10
        ]
      },
      {
        "type": "Punctuator",
        "value": "(",
        "loc": {
          "start": {
            "line": 1,
            "column": 11
          },
          "end": {
            "line": 1,
            "column": 12
          }
        },
        "range": [
          11,
          12
        ]
      },
      {
        "type": "Identifier",
        "value": "b",
        "loc": {
          "start": {
            "line": 1,
            "column": 12
          },
          "end": {
            "line": 1,
            "column": 13
          }
        },
        "range": [
          12,
          13
        ]
      },
      {
        "type": "Punctuator",
        "value": ",",
        "loc": {
          "start": {
            "line": 1,
            "column": 13
          },
          "end": {
            "line": 1,
            "column": 14
          }
        },
        "range": [
          13,
          14
        ]
      },
      {
        "type": "Identifier",
        "value": "c",
        "loc": {
          "start": {
            "line": 1,
            "column": 15
          },
          "end": {
            "line": 1,
            "column": 16
          }
        },
        "range": [
          15,
          16
        ]
      },
      {
        "type": "Punctuator",
        "value": ")",
        "loc": {
          "start": {
            "line": 1,
            "column": 16
          },
          "end": {
            "line": 1,
            "column": 17
          }
        },
        "range": [
          16,
          17
        ]
      },
      {
        "type": "Punctuator",
        "value": "{",
        "loc": {
          "start": {
            "line": 1,
            "column": 18
          },
          "end": {
            "line": 1,
            "column": 19
          }
        },
        "range": [
          18,
          19
        ]
      },
      {
        "type": "Punctuator",
        "value": "}",
        "loc": {
          "start": {
            "line": 1,
            "column": 19
          },
          "end": {
            "line": 1,
            "column": 20
          }
        },
        "range": [
          19,
          20
        ]
      }
    ],
    "parent": null
  }
}`;

exports.functionASTNoParent = `{
  "type": "FunctionDeclaration",
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 1,
      "column": 20
    }
  },
  "range": [
    0,
    20
  ],
  "id": {
    "type": "Identifier",
    "loc": {
      "start": {
        "line": 1,
        "column": 9
      },
      "end": {
        "line": 1,
        "column": 10
      }
    },
    "range": [
      9,
      10
    ],
    "name": "a"
  },
  "params": [
    {
      "type": "Identifier",
      "loc": {
        "start": {
          "line": 1,
          "column": 12
        },
        "end": {
          "line": 1,
          "column": 13
        }
      },
      "range": [
        12,
        13
      ],
      "name": "b"
    },
    {
      "type": "Identifier",
      "loc": {
        "start": {
          "line": 1,
          "column": 15
        },
        "end": {
          "line": 1,
          "column": 16
        }
      },
      "range": [
        15,
        16
      ],
      "name": "c"
    }
  ],
  "body": {
    "type": "BlockStatement",
    "loc": {
      "start": {
        "line": 1,
        "column": 18
      },
      "end": {
        "line": 1,
        "column": 20
      }
    },
    "range": [
      18,
      20
    ],
    "body": []
  },
  "expression": false,
  "generator": false
}`;
