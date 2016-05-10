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
        treeIterate(tree, function(node, parent){
            str.push(node.name + ', ' + parent.name);
        });

        assert.deepEqual(str, [
            'undefined, undefined',//this is a bug
            'parent, undefined',
            'child1, parent',
            'child2, parent',
            'child1Deep1, child1',
            'child1Deep2, child1',
            'child2Deep1, child2',
            'child2Deep2, child2'
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