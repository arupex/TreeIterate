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


    treeIterator(tree, function forEachCallback(node, parent, parents){
        parentNames = [];
        parents.forEach(function(anscestor){
            parentNames.push(anscestor.name);
        });
        console.log('Current Node :', node.name, ', Current Parent : ', parent.name, ', Parents : [ ', parentNames , ' ]');
    });


Expected Output:

          'Current Node : undefined, Current Parent : undefined, Parents: [  ]',
          'Current Node : parent, Current Parent : undefined, Parents: [  ]',
          'Current Node : child1, Current Parent : parent, Parents: [ parent, ]',
          'Current Node : child2, Current Parent : parent, Parents: [ parent, ]',
          'Current Node : child1Deep1, Current Parent : child1, Parents: [ child1,parent, ]',
          'Current Node : child1Deep2, Current Parent : child1, Parents: [ child1,parent, ]',
          'Current Node : child2Deep1, Current Parent : child2, Parents: [ child2,parent, ]',
          'Current Node : child2Deep2, Current Parent : child2, Parents: [ child2,parent, ]'