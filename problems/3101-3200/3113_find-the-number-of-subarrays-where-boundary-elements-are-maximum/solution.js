/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfSubarrays = function (nums) {
    const n = nums.length;
    // leftGreater[i]: nearest index to the left with a strictly greater value
    const leftGreater = new Array(n).fill(-1);
    const stack = [];
    for (let i = 0; i < n; i++) {
        const x = nums[i];
        // values <= x can never be the nearest greater for a later element
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= x) {
            stack.pop();
        }
        leftGreater[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
        stack.push(i);
    }

    // bisect_right: first index with lst[idx] > target
    function bisectRight(lst, target) {
        let lo = 0,
            hi = lst.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (lst[mid] <= target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    // earlier positions of each value, always appended in increasing order
    const positions = new Map();
    let ans = 0;
    for (let i = 0; i < n; i++) {
        const x = nums[i];
        let lst = positions.get(x);
        if (lst === undefined) {
            lst = [];
            positions.set(x, lst);
        }
        // equal-value starts beyond leftGreater[i], plus the singleton [i..i]
        const count = 1 + lst.length - bisectRight(lst, leftGreater[i]);
        ans += count;
        lst.push(i);
    }
    return ans;
};
