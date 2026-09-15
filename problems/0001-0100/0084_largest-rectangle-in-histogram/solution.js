/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
    const n = heights.length;
    // Stack of indices whose heights are strictly increasing. For any
    // bar, the widest full-height rectangle spans the nearest strictly
    // shorter bar on each side; the scan finds both boundaries
    // implicitly. Each index is pushed once and popped at most once,
    // so the nested while keeps the whole pass linear.
    const stack = [];
    let best = 0;
    for (let i = 0; i <= n; i++) {
        // h = 0 at i === n is a sentinel: shorter than everything, it
        // flushes every remaining bar without adding area itself.
        const h = i === n ? 0 : heights[i];
        // A shorter bar has arrived: every stack bar taller than h just
        // found its right boundary, the current index i. Strict `>`
        // leaves equal heights on the stack, so an equal run still
        // computes its full width when finally flushed.
        while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
            const height = heights[stack.pop()];
            // Left boundary is the new top (nearest still strictly
            // shorter bar), or -1 when the rectangle reaches the start.
            const left = stack.length > 0 ? stack[stack.length - 1] : -1;
            const area = height * (i - left - 1);
            if (area > best) best = area;
        }
        stack.push(i);
    }
    return best;
};
