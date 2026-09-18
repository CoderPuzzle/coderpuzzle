// The list is materialized once as an array of node values (the wire
// form already lists them in order); draw draws one slot uniformly,
// which is exactly a uniform choice over the list's nodes.
class Solution {
    private values: number[];

    constructor(head: number[]) {
        this.values = head.slice();
    }

    getRandom(): number {
        return this.values[Math.floor(Math.random() * this.values.length)];
    }
}
