/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function (nums) {
    const offset = 10002; // maps nums[i] in [-10^4, 10^4] to a positive index
    const size = 20005;
    const bit = new Array(size + 1).fill(0);

    const update = (i, delta) => {
        while (i <= size) {
            bit[i] += delta;
            i += i & -i;
        }
    };
    const query = (i) => {
        let total = 0;
        while (i > 0) {
            total += bit[i];
            i -= i & -i;
        }
        return total;
    };

    const result = [];
    for (let k = nums.length - 1; k >= 0; k--) {
        const index = nums[k] + offset;
        result.push(query(index - 1));
        update(index, 1);
    }
    return result.reverse();
};
