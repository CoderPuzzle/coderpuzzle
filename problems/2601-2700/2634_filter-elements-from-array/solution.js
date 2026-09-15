class Solution {
    solve(filterCase) {
        // Manual walk instead of Array.filter: keep arr[i] only when its
        // own fn(arr[i], i) call result is truthy, order preserved. Both
        // arguments go to every call, so fns may read the element, the
        // index, or both; truthiness of raw non-boolean results is what
        // an if() would test — 0, NaN, "", undefined and false all drop.
        const filtered = [];
        const { arr, fn } = filterCase;
        for (let i = 0; i < arr.length; ++i) {
            if (fn(arr[i], i)) filtered.push(arr[i]);
        }
        return filtered;
    }
}
