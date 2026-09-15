/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minMaxSubarraySum = function (nums, k) {
    // Number of (a, b) with 0<=a<=A, 0<=b<=B, a+b<=K.
    function countPairs(A, B, K) {
        if (K < 0 || A < 0 || B < 0) return 0;
        if (A > K) A = K;
        if (B > K) B = K;
        if (A + B <= K) return (A + 1) * (B + 1);
        const t = K - B;
        let total = 0;
        if (t >= 0) {
            total += (Math.min(A, t) + 1) * (B + 1);
        }
        const lo = Math.max(0, t + 1);
        if (lo <= A) {
            const m = A - lo + 1;
            total += m * (K + 1) - Math.floor(((lo + A) * m) / 2);
        }
        return total;
    }

    const n = nums.length;
    const K = k - 1;

    const Lmax = new Array(n);
    const Rmax = new Array(n);
    let stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length && nums[stack[stack.length - 1]] <= nums[i]) stack.pop();
        Lmax[i] = stack.length ? i - stack[stack.length - 1] - 1 : i;
        stack.push(i);
    }
    stack = [];
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length && nums[stack[stack.length - 1]] < nums[i]) stack.pop();
        Rmax[i] = stack.length ? stack[stack.length - 1] - i - 1 : n - 1 - i;
        stack.push(i);
    }

    const Lmin = new Array(n);
    const Rmin = new Array(n);
    stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) stack.pop();
        Lmin[i] = stack.length ? i - stack[stack.length - 1] - 1 : i;
        stack.push(i);
    }
    stack = [];
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length && nums[stack[stack.length - 1]] > nums[i]) stack.pop();
        Rmin[i] = stack.length ? stack[stack.length - 1] - i - 1 : n - 1 - i;
        stack.push(i);
    }

    let answer = 0;
    for (let i = 0; i < n; i++) {
        const cnt = countPairs(Lmax[i], Rmax[i], K) + countPairs(Lmin[i], Rmin[i], K);
        answer += nums[i] * cnt;
    }
    return answer;
};
