// Largest rectangle under one row's histogram: monotonic stack of
// column indices with strictly increasing heights.
function largestRectangleArea(heights: number[]): number {
    const n = heights.length;
    const stack: number[] = [];
    let best = 0;
    for (let i = 0; i <= n; i++) {
        // h = 0 at i === n is a sentinel that flushes whatever remains
        // on the stack at the end of the row.
        const h = i === n ? 0 : heights[i];
        // A shorter bar has arrived: every stack bar taller than h just
        // found its right boundary, the current index i. Strict `>`
        // leaves equal heights on the stack, so the earlier of two
        // equal bars accounts for the full run when finally popped.
        while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
            const height = heights[stack.pop()!];
            // Left boundary is the new top (nearest strictly shorter
            // bar), or -1 when the rectangle reaches the start.
            const left = stack.length > 0 ? stack[stack.length - 1] : -1;
            const area = height * (i - left - 1);
            if (area > best) best = area;
        }
        stack.push(i);
    }
    return best;
}

function maximalRectangle(matrix: string[][]): number {
    if (matrix.length === 0 || matrix[0].length === 0) return 0;
    const rows = matrix.length,
        cols = matrix[0].length;
    // Every all-ones rectangle has a bottom row, and that row sees a
    // histogram of consecutive-1 column heights; solving largest
    // rectangle once per row and taking the max covers them all.
    const heights = new Array<number>(cols).fill(0);
    let best = 0;
    for (let r = 0; r < rows; r++) {
        // Fold the row in: '1' extends the run, '0' resets to 0 since a
        // rectangle cannot span a zero.
        for (let c = 0; c < cols; c++) {
            heights[c] = matrix[r][c] === "1" ? heights[c] + 1 : 0;
        }
        const area = largestRectangleArea(heights);
        if (area > best) best = area;
    }
    return best;
}
