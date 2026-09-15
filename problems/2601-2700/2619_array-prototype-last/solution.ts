Array.prototype.last = function (this: any[]): any {
    // The receiver is whatever array the method is invoked on, so plain
    // length arithmetic answers for every array at once: index
    // this.length - 1, with -1 as the statement's empty-array sentinel.
    return this.length === 0 ? -1 : this[this.length - 1];
};

class Solution {
    solve(lastCase: LastCase): void {
        lastCase.collect();
    }
}
