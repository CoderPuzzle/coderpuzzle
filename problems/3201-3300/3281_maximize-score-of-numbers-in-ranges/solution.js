/**
 * @param {number[]} start
 * @param {number} d
 * @return {number}
 */
var maxPossibleScore = function (start, d) {
    const arr = Array.from(start).sort((a, b) => a - b);
    const n = arr.length;

    const feasible = (x) => {
        let last = arr[0];
        for (let i = 1; i < n; i++) {
            const chosen = Math.max(arr[i], last + x);
            if (chosen > arr[i] + d) {
                return false;
            }
            last = chosen;
        }
        return true;
    };

    let lo = 0;
    let hi = arr[n - 1] + d - arr[0] + 1; // hi is infeasible
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (feasible(mid)) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo - 1;
};
