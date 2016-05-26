/**
 * Created by daniel.irwin on 5/26/16.
 */
describe('', function(){
  var tree = [
    {
      "display_label": "Virtual",
      
      "children": [
        {
          "display_label": "group",
          
          "children": [
            {
              "display_label": "1",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "1",
          
          "children": [
            {
              "display_label": "1.0",
              
              
              "children": []
            },
            {
              "display_label": "1.1",
              
              
              "children": []
            },
            {
              "display_label": "1.2",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "2",
          
          "children": [
            {
              "display_label": "2.0",
              
              
              "children": []
            },
            {
              "display_label": "2.1",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "3",
          
          "children": [
            {
              "display_label": "3.0",
              
              
              "children": []
            },
            {
              "display_label": "3.1",
              
              
              "children": []
            },
            {
              "display_label": "Special ",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "4",
          
          "children": [
            {
              "display_label": "4.0",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "5",
          
          "children": [
            {
              "display_label": "5.0",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "6",
          
          "children": [
            {
              "display_label": "6.0",
              
              
              "children": []
            },
            {
              "display_label": "6.1",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "7",
          
          "children": [
            {
              "display_label": "7.0",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "8",
          
          "children": [
            {
              "display_label": "8.0",
              
              
              "children": []
            },
            {
              "display_label": "8.1",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "9",
          
          "children": [
            {
              "display_label": "9.0",
              
              
              "children": []
            },
            {
              "display_label": "9.1",
              
              
              "children": []
            },
            {
              "display_label": "9.2",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "10",
          
          "children": [
            {
              "display_label": "10.0",
              
              
              "children": []
            },
            {
              "display_label": "10.1",
              
              
              "children": []
            },
            {
              "display_label": "10.2",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "11",
          
          "children": [
            {
              "display_label": "11.0",
              
              
              "children": []
            },
            {
              "display_label": "11.1",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "12",
          
          "children": [
            {
              "display_label": "12.0",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "13",
          
          "children": [
            {
              "display_label": "13.0",
              
              
              "children": []
            },
            {
              "display_label": "13.1",
              
              
              "children": []
            }
          ]
        },
        {
          "display_label": "14",
          
          "children": [
            {
              "display_label": "14.0",
              
              
              "children": []
            }
          ]
        }
      ]
    }
  ];

  var treeIterate = require('../index');

  var assert = require('chai').assert;


  it('Large Tree Test of parents ancestry', function(){
    var str = [];
    treeIterate(tree, function test(node, parent, parents) {
      if (node.display_label === "13") {
        parents.forEach(function grabDepth(nodeParent) {
          str.push(nodeParent.display_label);
        });

        assert.deepEqual(str, [
          'Virtual',
          undefined
        ]);
      }
    });
  });

});