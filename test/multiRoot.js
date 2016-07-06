/**
 * Created by daniel.irwin on 7/6/16.
 */

describe('multi-root', function(){

    var treeIterate = require('../index');
    var assert = require('assert-diff').deepEqual;


    var tree = [
        {
            name : 'root1',
            children : []
        },
        {
            name : 'root2',
            children : []
        },
        {
            name : 'root3',
            children : []
        },
        {
            name : 'root4',
            children : []
        }
    ];



    it('multi-root', function(done){

        var first = true;

        treeIterate(tree, {}, function(node, parent, parents){

            if(first) {
                assert(parent, {}, 'first parent');

                assert(parents, [], 'first parents');
            }
            else{
                assert(parent, {}, 'parent');

                assert(parents, [], 'parents');
            }

            first = false;
            return true;

        });

        done();

    });


});