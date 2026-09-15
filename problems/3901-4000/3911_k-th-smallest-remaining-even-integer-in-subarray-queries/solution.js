/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var kthRemainingInteger = function (nums, queries) {
    const positions = [];
    const adjusted = [];
    for (let index = 0; index < nums.length; ++index) {
        if (nums[index] % 2 === 0) {
            positions.push(index);
            adjusted.push(nums[index] / 2 - (positions.length - 1));
        }
    }

    const lowerBound = (values, target, from = 0, to = values.length) => {
        while (from < to) {
            const middle = (from + to) >>> 1;
            if (values[middle] < target) from = middle + 1;
            else to = middle;
        }
        return from;
    };
    const upperBound = (values, target, from = 0, to = values.length) => {
        while (from < to) {
            const middle = (from + to) >>> 1;
            if (values[middle] <= target) from = middle + 1;
            else to = middle;
        }
        return from;
    };

    return queries.map(([left, right, k]) => {
        const first = lowerBound(positions, left);
        const last = upperBound(positions, right);
        const crossed = upperBound(adjusted, k - first, first, last) - first;
        return 2 * (k + crossed);
    });
};
