# tree-iterate


    npm install tree-iterate --save
    

# Example Usage:

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


# Expected Output:

          'Current Node : undefined, Current Parent : undefined, Parents: [  ]',
          'Current Node : parent, Current Parent : undefined, Parents: [  ]',
          'Current Node : child1, Current Parent : parent, Parents: [ parent, ]',
          'Current Node : child2, Current Parent : parent, Parents: [ parent, ]',
          'Current Node : child1Deep1, Current Parent : child1, Parents: [ child1,parent, ]',
          'Current Node : child1Deep2, Current Parent : child1, Parents: [ child1,parent, ]',
          'Current Node : child2Deep1, Current Parent : child2, Parents: [ child2,parent, ]',
          'Current Node : child2Deep2, Current Parent : child2, Parents: [ child2,parent, ]'



# Performance Characteristics (test/perf.js) :

**Fairly Balanced Tree (each parent has a couple children, balanced wide/deep/tall)**

        Nodes/Iterations       Time        Time Per Item
        [561867/561868]        31665ms     0.05635675346656771ms
        [281075/281076]        550ms       0.0019567731032642532ms
        [140537/140538]        286ms       0.002035051267637704ms
        [70339/70340]          146ms       0.0020756621504428555ms
        [35169/35170]          77ms        0.0021894281895987943ms
        [17621/17622]          36ms        0.0020430168548890527ms
        [8810/8811]            16ms        0.0018161180476730988ms
        [4423/4424]            8ms         0.0018087271082975356ms
        [2211/2212]            4ms         0.0018091361374943465ms
        [1115/1116]            3ms         0.0026905829596412557ms
        [557/558]              1ms         0.0017953321364452424ms
        [283/284]              1ms         0.0035335689045936395ms

**Purely Deep Tree (each layer is a single child) :**

         Nodes/Iterations      Time          Time Per Item
          [100000/100001]      33085ms       0.33085ms
          [66667/66668]        84ms          0.0012599937000314998ms
          [44445/44446]        34ms          0.0007649904376195297ms
          [29630/29631]        18ms          0.0006074924063449207ms
          [19754/19755]        12ms          0.0006074719044244204ms
          [13170/13171]        9ms           0.000683371298405467ms
          [8780/8781]          7ms           0.0007972665148063781ms
          [5854/5855]          3ms           0.0005124701059104886ms
          [3903/3904]          3ms           0.0007686395080707148ms
          [2602/2603]          2ms           0.0007686395080707148ms
          [1735/1736]          1ms           0.0005763688760806917ms
          [1157/1158]          1ms           0.000864304235090752ms