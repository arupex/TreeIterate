/**
 * Created by dirwin517 on 5/10/16.
 */

/**
 *
 * @param {tree} tree - the tree either [{children:[]},{children:[]}] or { children : [] }
 *
 * @param {options} optional input for configuring some details
 *
 * @param {function} iteratorCallback - called on each iteration with parameters of node, and parent
 *
 * @constructor
 *
 */
function Arupex_TreeIterator(tree, options, iteratorCallback){
    if(!tree){
        return;
    }

    //keeping backward compatability
    if(arguments.length === 2 || typeof options === 'function'){
        iteratorCallback = options;
        options = {};
    }

    function cleanupData() {
        var itOver = [];
        if (typeof tree === 'object' && !Array.isArray(tree)) {
            itOver =[{child: { __root : true, children: [tree]}}];
        }
        else {
            itOver = [{child: { __root : true, children: tree}}];
        }
        itOver[0].parent = itOver;
        if (!options.ignoreParents) {
            itOver[0].parents = [];
        }
        if (!options.ignoreParentalsArray) {
            itOver[0].parentalIndex = [];
        }
        return itOver;
    }

    var itOver = cleanupData();

    var keepGoing = true;
    while(itOver.length > 0 && keepGoing) {
        var val = itOver.shift();
        if(val && val.child) {

            //handle parent of root
            if (!val.parent || val.parent.length === 0) {
                val.parent = val;
            }
            if (!val.parent.children && val.parent.child) {
                val.parent = val.parent.child;
            }

            var parentIsRoot = (val.parent && val.parent.__root);
            var parentShown = (parentIsRoot ? {} : val.parent);
            var parentsShown = (parentIsRoot ? [] : val.parents);

            var callbackResponse = options.objectCallback?iteratorCallback(val):iteratorCallback(val.child, parentShown, parentsShown, val.parentalIndex);
            //keep going if undefined
            keepGoing = (callbackResponse === undefined) || callbackResponse;

            var newParents;

            if(!options.ignoreParents){
                newParents = [val.child].concat(val.parents);
            }

            if (val.child.children && keepGoing) {

                var newChildren = [];

                var childIndex = 0;

                function convert(child) {

                    var parentalIndex;
                    if(!options.ignoreParentalsArray){
                        parentalIndex = [childIndex];
                        Array.prototype.push.apply(parentalIndex, val.parentalIndex);
                    }

                    newChildren.push({
                        parent: val.child,
                        child: child,
                        parents: newParents,
                        parentalIndex : parentalIndex
                    });

                    ++childIndex;
                }

                val.child.children.forEach(convert);

                Array.prototype.push.apply(itOver, newChildren);
            }
        }
    }
    return tree;
}

//Make it useable in browser as well
if(typeof module !== 'undefined'){
    module.exports = Arupex_TreeIterator;
}
