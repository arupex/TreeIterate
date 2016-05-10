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
function TreeIterator(tree, iteratorCallback){
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

    var keepGoing = true;
    while(itOver.length > 0 && keepGoing) {
        var val = itOver.shift();
        if(val.child) {
            var callbackResponse = iteratorCallback(val.child, val.parent);
            //keep going if undefined
            keepGoing = (callbackResponse === undefined) || callbackResponse;
        }

        if(val.child.children && keepGoing) {

            var newChildren = [];
            val.child.children.forEach(function convert(child){
                newChildren.push({
                    parent : val.child,
                    child : child
                });
            });

            Array.prototype.push.apply(itOver, newChildren);
        }
    }
}

//Make it useable in browser as well
if(typeof module !== 'undefined'){
    module.exports = TreeIterator;
}
