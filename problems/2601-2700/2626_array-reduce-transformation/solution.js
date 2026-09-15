// One accumulator, one pass: res starts at init and each element folds in
// through fn(res, nums[i]) exactly as the statement's operation sequence
// spells out — the previous return value feeding the next call is what
// makes a plain forward loop the whole algorithm. An empty array never
// enters the loop, so init falls out untouched. No Array.reduce anywhere;
// the loop IS the reduction.
function reduce(nums, fn, init) {
    let res = init;
    for (let i = 0; i < nums.length; i++) {
        res = fn(res, nums[i]);
    }
    return res;
}

class Solution {
    reduce(reduceCase) {
        return reduce(reduceCase.nums, reduceCase.fn, reduceCase.init);
    }
}
