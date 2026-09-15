/**
 * @param {number[]} mapping
 * @param {number[]} nums
 * @return {number[]}
 */
var sortJumbled = function (mapping, nums) {
    // Decorate with (mapped value, original index), sort the pairs, then
    // read the originals back in order.
    const mapped = (value) => {
        if (value === 0) {
            return mapping[0];
        }
        let out = 0;
        let scale = 1;
        for (let rest = value; rest > 0; rest = Math.floor(rest / 10)) {
            out += mapping[rest % 10] * scale;
            scale *= 10;
        }
        return out;
    };
    const keyed = nums.map((value, index) => ({ value: mapped(value), index }));
    keyed.sort((a, b) => a.value - b.value || a.index - b.index);
    return keyed.map((entry) => nums[entry.index]);
};
