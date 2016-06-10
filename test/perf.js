/**
 * Created by daniel.irwin on 5/26/16.
 */
describe('Test Performance', function(){

  function itGenerateTree(sizing){
    var data = [];
    var i = 0;

    var arrayToNext = data;
      for (var z = 0; z < sizing; ++z) {

        var tmp = {
          data : 'index-' + (++i),
          children : []
        };

        data.push(tmp);

        arrayToNext = tmp.children;

    }

    return {
      tree : data,
      totalNodes : i
    };
  }


  function generateTree(sizing){
    var data = [];
    var i = 0;

    function addChildren(array, sizing) {
      for (var z = 0; z < sizing; ++z) {

        var inde = (++i);

        var tmp = {
          data : 'index-' + inde,
          children : []
        };

        addChildren(tmp.children, --sizing);

        array.push(tmp);
      }
    }

    addChildren(data, sizing);

    return {
      tree : data,
      totalNodes : i
    };
  }

  var treeIterate = require('../index');

  function testSize(size, fn) {
    var tree = fn(size);

    //console.log('', JSON.stringify(tree.tree, null, 3));

    var start = new Date().getTime();
    var numberOfIterations = 0;
    treeIterate(tree.tree, function (node) {
      ++numberOfIterations;
    });
    var end = new Date().getTime();
    var diff = end - start;

    return {
      diff: diff,
      perNode: diff / tree.totalNodes,
      totalNodes : tree.totalNodes,
      numberOfIteration : numberOfIterations
    };
  }

  //total [561867/561868]: 31665ms  per Item : 0.05635675346656771ms
  //total [281075/281076]: 550ms  per Item : 0.0019567731032642532ms
  //total [140537/140538]: 286ms  per Item : 0.002035051267637704ms
  //total [70339/70340]: 146ms  per Item : 0.0020756621504428555ms
  //total [35169/35170]: 77ms  per Item : 0.0021894281895987943ms
  //total [17621/17622]: 36ms  per Item : 0.0020430168548890527ms
  //total [8810/8811]: 16ms  per Item : 0.0018161180476730988ms
  //total [4423/4424]: 8ms  per Item : 0.0018087271082975356ms
  //total [2211/2212]: 4ms  per Item : 0.0018091361374943465ms
  //total [1115/1116]: 3ms  per Item : 0.0026905829596412557ms
  //total [557/558]: 1ms  per Item : 0.0017953321364452424ms
  //total [283/284]: 1ms  per Item : 0.0035335689045936395ms
  it('large tree speed', function() {
    this.timeout(50000);

    for(var size = 20; size > 0; --size) {
      var result = testSize(size, generateTree);
      console.log('\ttotal [' + result.totalNodes + '/' + result.numberOfIteration + ']: ' + result.diff + 'ms', ' per Item : ' + result.perNode + 'ms');
    }

  });



  //total [100000/100001]: 33085ms  per Item : 0.33085ms
  //total [66667/66668]: 84ms  per Item : 0.0012599937000314998ms
  //total [44445/44446]: 34ms  per Item : 0.0007649904376195297ms
  //total [29630/29631]: 18ms  per Item : 0.0006074924063449207ms
  //total [19754/19755]: 12ms  per Item : 0.0006074719044244204ms
  //total [13170/13171]: 9ms  per Item : 0.000683371298405467ms
  //total [8780/8781]: 7ms  per Item : 0.0007972665148063781ms
  //total [5854/5855]: 3ms  per Item : 0.0005124701059104886ms
  //total [3903/3904]: 3ms  per Item : 0.0007686395080707148ms
  //total [2602/2603]: 2ms  per Item : 0.0007686395080707148ms
  //total [1735/1736]: 1ms  per Item : 0.0005763688760806917ms
  //total [1157/1158]: 1ms  per Item : 0.000864304235090752ms
  it('large tree speed', function() {
    this.timeout(50000);

    for(var size = 100000; size > 2; size = Math.ceil(size/1.5)) {
      var result = testSize(size, itGenerateTree);
      console.log('\ttotal [' + result.totalNodes + '/' + result.numberOfIteration + ']: ' + result.diff + 'ms', ' per Item : ' + result.perNode + 'ms');
    }

  });


});