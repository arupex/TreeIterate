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

    var itOver = [{child: { __root : true, children: tree}}];

    if (!Array.isArray(tree)) {
        itOver =[{child: { __root : true, children: [tree]}}];
    }

    itOver[0].parent = itOver;

    if (!itOver[0].parent || itOver[0].parent.length === 0) {
        itOver[0].parent = itOver[0];
    }
    if (!itOver[0].parent.children && itOver[0].parent.child) {
        itOver[0].parent = itOver[0].parent.child;
    }

    //keeping backward compatability
    if(arguments.length === 2 || typeof options === 'function'){
        iteratorCallback = options;
        options = {};
    }

    if (!options.ignoreParents) {
        itOver[0].parents = [];
    }
    if (!options.ignoreParentalsArray) {
        itOver[0].parentalIndex = [];
    }

    var parentIsRoot;
    var val;

    while((val = itOver.shift())) {

        if(val.child) {

            parentIsRoot = (val.parent && val.parent.__root);

            var callbackResponse = options.objectCallback?iteratorCallback(val):iteratorCallback(val.child, (parentIsRoot ? {} : val.parent), (parentIsRoot ? [] : val.parents), val.parentalIndex);
            //keep going if undefined
            if(!callbackResponse && (callbackResponse !== undefined)){
                return tree;
            }

            if (val.child.children) {

                var parentalIndex;
                for(var zi = 0; zi < val.child.children.length; ++zi){

                    if(!options.ignoreParentalsArray){
                        parentalIndex = [zi];

                        for(var z = 0; z < val.parentalIndex.length; ++z){
                            parentalIndex.push(val.parentalIndex[z]);
                        }
                    }

                    itOver.push({
                        parent: val.child,
                        child: val.child.children[zi],
                        parents: !options.ignoreParents?[val.child].concat(val.parents):undefined,
                        parentalIndex : parentalIndex
                    });
                }
            }
        }
    }
    return tree;
}

//Make it useable in browser as well
if(typeof module !== 'undefined'){
    module.exports = Arupex_TreeIterator;
}
