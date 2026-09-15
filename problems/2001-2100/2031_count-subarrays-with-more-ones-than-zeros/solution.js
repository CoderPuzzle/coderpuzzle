/**
 * @param {number[]} nums
 * @return {number}
 */
var subarraysWithMoreOnesThanZeroes = function (nums) {
    const mod = 1000000007;
    const size = 2 * nums.length + 3;
    const offset = nums.length + 1;
    const bit = new Array(size).fill(0);

    const add = (start) => {
        for (let index = start; index < size; index += index & -index) {
            bit[index]++;
        }
    };
    const query = (start) => {
        let total = 0;
        for (let index = start; index > 0; index -= index & -index) {
            total += bit[index];
        }
        return total;
    };

    let prefix = 0;
    let answer = 0;
    add(offset);
    for (const value of nums) {
        prefix += value === 1 ? 1 : -1;
        const index = prefix + offset;
        answer = (answer + query(index - 1)) % mod;
        add(index);
    }
    return answer;
};
