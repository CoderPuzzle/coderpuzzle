// One accumulator, one pass: res starts at init and each element folds in
// through fn(res, nums[i]) exactly as the statement's operation sequence
// spells out — the previous return value feeding the next call is what
// makes a plain forward loop the whole algorithm. An empty array never
// enters the loop, so init falls out untouched. No Array.reduce anywhere;
// the loop IS the reduction.
type Reducer = (accum: number, curr: number) => number;

function reduce(nums: number[], fn: Reducer, init: number): number {
    let res: number = init;
    for (let i = 0; i < nums.length; i++) {
        res = fn(res, nums[i]);
    }
    return res;
}

class Solution {
    reduce(reduceCase: ReduceCase): number {
        return reduce(reduceCase.nums, reduceCase.fn, reduceCase.init);
    }
}
