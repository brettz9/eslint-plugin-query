'use strict';

exports.functionAST = `{
  "type": "FunctionDeclaration",
  "start": 0,
  "end": 20,
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
    "start": 9,
    "end": 10,
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
      "start": 12,
      "end": 13,
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
      "start": 15,
      "end": 16,
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
    "start": 18,
    "end": 20,
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
    "start": 0,
    "end": 20,
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
        "start": 0,
        "end": 8,
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
        "start": 9,
        "end": 10,
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
        "start": 11,
        "end": 12,
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
        "start": 12,
        "end": 13,
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
        "start": 13,
        "end": 14,
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
        "start": 15,
        "end": 16,
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
        "start": 16,
        "end": 17,
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
        "start": 18,
        "end": 19,
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
        "start": 19,
        "end": 20,
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
  "start": 0,
  "end": 20,
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
    "start": 9,
    "end": 10,
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
      "start": 12,
      "end": 13,
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
      "start": 15,
      "end": 16,
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
    "start": 18,
    "end": 20,
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
