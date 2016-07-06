/**
 * Created by Joe Bartelmo on 5/26/16.
 */
describe('Test Parent Trace of Tree Iterate', function () {
    var treeIterate = require('../index');
    var assert = require('chai').assert;

    var tree = [
        {
            depth: 1,
            children: [
                {
                    depth: 2,
                    children: [
                        {
                            depth: 3,
                            children: [
                                {
                                    depth: 4,
                                    children: [
                                        {
                                            depth: 5
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    it('test get all parents', function () {
        var str = [];
        treeIterate(tree, function test(node, parent, parents, parrentArrayIndex) {

            if (node.depth === 5) {
                parents.forEach(function grabDepth(nodeParent) {
                    str.push(nodeParent.depth);
                });

                assert.deepEqual(str, [
                    4,
                    3,
                    2,
                    1,
                    undefined
                ]);
            }
        });
    });
});