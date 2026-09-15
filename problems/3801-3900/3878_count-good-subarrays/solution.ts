// A subarray is good iff its bitwise OR equals its maximum element, i.e.
// every element's bits are contained in the max's bits. Count each subarray
// at its rightmost maximum: index i owns subarrays inside (left[i], right[i])
// from two monotonic stacks, and the bit condition shrinks that window to the
// nearest element on each side carrying a bit absent from nums[i]. At n = 10^5
// the answer reaches n(n+1)/2 ~ 5*10^9 and every intermediate stays below
// 10^10 — both far below 2^53 ≈ 9.0*10^15, where doubles represent integers
// exactly.
function countGoodSubarrays(nums: number[]): number {
    const n = nums.length;
    const left = new Array<number>(n);
    const right = new Array<number>(n);
    const stack: number[] = [];
    for (let i = 0; i < n; ++i) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
            stack.pop();
        }
        left[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
        stack.push(i);
    }
    stack.length = 0;
    for (let i = n - 1; i >= 0; --i) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
            stack.pop();
        }
        right[i] = stack.length > 0 ? stack[stack.length - 1] : n;
        stack.push(i);
    }
    const bits = 31; // nums[i] < 2^30; bit 30 stays unused
    const last = new Array<number>(bits).fill(-1);
    const nxt = new Array<number>(bits).fill(n);
    const maxLeft = new Array<number>(n);
    const minRight = new Array<number>(n);
    for (let i = 0; i < n; ++i) {
        const x = nums[i];
        let m = -1;
        for (let b = 0; b < bits; ++b) {
            if (((x >> b) & 1) === 0 && last[b] > m) {
                m = last[b];
            }
        }
        maxLeft[i] = m;
        let y = x;
        while (y !== 0) {
            const low = y & -y;
            last[31 - Math.clz32(low)] = i;
            y ^= low;
        }
    }
    for (let i = n - 1; i >= 0; --i) {
        const x = nums[i];
        let m = n;
        for (let b = 0; b < bits; ++b) {
            if (((x >> b) & 1) === 0 && nxt[b] < m) {
                m = nxt[b];
            }
        }
        minRight[i] = m;
        let y = x;
        while (y !== 0) {
            const low = y & -y;
            nxt[31 - Math.clz32(low)] = i;
            y ^= low;
        }
    }
    let ans = 0;
    for (let i = 0; i < n; ++i) {
        const lo = left[i] > maxLeft[i] ? left[i] : maxLeft[i];
        const hi = right[i] < minRight[i] ? right[i] : minRight[i];
        ans += (i - lo) * (hi - i);
    }
    return ans;
}
