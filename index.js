/**
 * Created by dirwin517 on 5/10/16.
 */

/**
 *
 * @param {tree} tree - the tree either [{children:[]},{children:[]}] or { children : [] }
 *
 * @param {function} iteratorCallback - called on each iteration with parameters of node, and parent
 *
 * @constructor
 *
 */
function Arupex_TreeIterator(tree, iteratorCallback){
    var itOver = [];
    if(!tree){
        return;
    }

    if (typeof tree === 'object' && !tree.forEach) {
        itOver = [ { child : { children : [tree] } } ];
    }
    else {
        itOver = [ { child : { children : tree } } ];
    }
    itOver[0].parent = itOver;
    itOver[0].parents = [];

    var keepGoing = true;
    while(itOver.length > 0 && keepGoing) {
        var val = itOver.shift();
        if(val.child) {

            //handle parent of root
            if(!val.parent || val.parent.length === 0){
                val.parent = val;
            }
            if(!val.parent.children && val.parent.child){
                val.parent = val.parent.child;
            }

            var callbackResponse = iteratorCallback(val.child, val.parent, val.parents);
            //keep going if undefined
            keepGoing = (callbackResponse === undefined) || callbackResponse;
        }

        val.parents.unshift(val.child);

        if(val.child.children && keepGoing) {

            var newChildren = [];

            val.child.children.forEach(function convert(child){
                newChildren.push({
                    parent : val.child,
                    child : child,
                    parents: val.parents
                });
            });

            Array.prototype.push.apply(itOver, newChildren);
        }
    }
    return tree;
}

//Make it useable in browser as well
if(typeof module !== 'undefined'){
    module.exports = Arupex_TreeIterator;
}
