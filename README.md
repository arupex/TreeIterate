# tree-iterate


    npm install tree-iterate --save
    

Example Usage:

    var treeIterator = require('tree-iterate');

    var tree = [{
                    name : 'parent',
                    children : [
                        {
                            name : 'child1',
                            children : [
                                {
                                    name : 'child1Deep1'
                                },
                                {
                                    name : 'child1Deep2'
                                }
                            ]
                        },
                        {
                            name : 'child2',
                            children : [
                                {
                                    name : 'child2Deep1'
                                },
                                {
                                    name : 'child2Deep2'
                                }
                            ]
                        }
                    ]
                }];


    treeIterator(tree, function forEachCallback(node, parent){
        console.log(node.name, parent.name);
    });


Expected Output:

    undefined, undefined //probably a fault
    parent, undefined
    child1, parent
    child2, parent
    child1Deep1, child1
    child1Deep2, child1
    child2Deep1, child2
    child2Deep2, child2