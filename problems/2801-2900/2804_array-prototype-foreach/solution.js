Array.prototype.forEach = function (callback, context) {
    // One ascending pass over the receiver's own indices, with the range
    // fixed at entry: every slot gets exactly one call carrying the full
    // (element, index, array) triple positionally, and call() installs
    // the context as this for each visit. Because writes go through the
    // receiver itself, slot assignments made by earlier iterations are
    // visible to later ones; nothing is collected anywhere — forEach is
    // defined purely by the state it leaves the array in.
    const length = this.length;
    for (let index = 0; index < length; ++index) {
        callback.call(context, this[index], index, this);
    }
};

class Solution {
    solve(forEachCase) {
        // collect() first proves the enhancement on fresh probe arrays
        // (argument triple, ascending order, context binding,
        // empty-array silence, no return), then run() drives this case's
        // own array through it and records the final contents.
        forEachCase.collect();
        forEachCase.run();
    }
}
