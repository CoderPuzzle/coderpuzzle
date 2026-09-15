// Monotonic stack of the minima of currently open windows. An element equal
// to the top continues that window's group (same operation), a larger element
// opens a new group (one more operation), and anything smaller — including 0
// — closes every window above it.
function minOperations(nums: number[]): number {
    const stack: number[] = [];
    let ans = 0;
    for (const x of nums) {
        while (stack.length > 0 && stack[stack.length - 1] > x) stack.pop();
        if (x > 0 && (stack.length === 0 || stack[stack.length - 1] < x)) {
            ans++;
            stack.push(x);
        }
    }
    return ans;
}
