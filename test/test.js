/**
 * Created by dirwin517 on 5/10/16.
 */
describe('Test Tree Iterate', function(){

    var assert = require('chai').assert;

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

    var treeIterate = require('../index');

    it('test full iteration', function(){
        var str = [];


        treeIterate(tree, function(node, parent, parents){

          parentNames = [];

            parents.forEach(function(anscestor){
              parentNames.push(anscestor.name);
            });
            str.push('Current Node : ' + node.name + ', Current Parent : ' + parent.name + ', Parents: [ ' + (parentNames) + ' ]');

        });

        assert.deepEqual(str, [
          'Current Node : undefined, Current Parent : undefined, Parents: [  ]',
          'Current Node : parent, Current Parent : undefined, Parents: [  ]',
          'Current Node : child1, Current Parent : parent, Parents: [ parent, ]',
          'Current Node : child2, Current Parent : parent, Parents: [ child1,parent, ]',
          'Current Node : child1Deep1, Current Parent : child1, Parents: [ child2,child1,parent, ]',
          'Current Node : child1Deep2, Current Parent : child1, Parents: [ child1Deep1,child2,child1,parent, ]',
          'Current Node : child2Deep1, Current Parent : child2, Parents: [ child1Deep2,child1Deep1,child2,child1,parent, ]',
          'Current Node : child2Deep2, Current Parent : child2, Parents: [ child2Deep1,child1Deep2,child1Deep1,child2,child1,parent, ]'
        ]);

    });


    it('test premature ending', function(){
        var str = [];
        var count = 0;
        treeIterate(tree, function(node, parent){
            str.push(node.name + ', ' + parent.name);
            if(count == 2){
                return false;
            }
            count++;
        });

        assert.deepEqual(str, [
            'undefined, undefined',//this is a bug
            'parent, undefined',
            'child1, parent'
        ]);

    });

});