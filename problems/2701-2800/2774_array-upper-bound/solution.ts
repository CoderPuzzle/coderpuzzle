interface Array<T> {
    upperBound(target: number): number;
}

class Solution {
    solve(arrCase: ArrCase): number {
        // Enhance every array with upperBound: a hi-converging binary
        // search for the rightmost occurrence. Invariant: everything left
        // of lo is <= target and everything from hi onward is > target, so
        // when the pointers meet, lo is the first index past the target's
        // run — nums[lo - 1] is the last occurrence, or the target is
        // absent and the answer is -1.
        Array.prototype.upperBound = function (target: number): number {
            let lo = 0;
            let hi = this.length;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (this[mid] <= target) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            return lo > 0 && this[lo - 1] === target ? lo - 1 : -1;
        };
        return arrCase.nums.upperBound(arrCase.target);
    }
}
