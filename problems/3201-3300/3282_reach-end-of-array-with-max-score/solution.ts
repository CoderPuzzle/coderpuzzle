// The optimal first hop out of any position lands on the nearest later
// index holding a strictly greater value: everything in between is at most
// the current value, so any detour's legs earn no more per unit of
// distance than staying put over the same ground, while the leg beyond the
// swap gains the strictly larger rate. When no greater value remains,
// jumping straight to the last index is optimal by the same telescoping
// bound. Precompute those nearest greater neighbors with a right-to-left
// monotonic stack, then walk the chain. The total stays under
// (n - 1) * 10^5 < 2^53, so plain numbers are exact.
function findMaximumScore(nums: number[]): number {
    const n = nums.length;
    const jump = new Array(n).fill(n - 1);
    const stack = [];
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
            stack.pop();
        }
        if (stack.length > 0) {
            jump[i] = stack[stack.length - 1];
        }
        stack.push(i);
    }
    let score = 0;
    let pos = 0;
    while (pos < n - 1) {
        score += (jump[pos] - pos) * nums[pos];
        pos = jump[pos];
    }
    return score;
}
