function canSeePersonsCount(heights: number[]): number[] {
    const n = heights.length;
    const answer: number[] = new Array(n).fill(0);
    // Scan right-to-left; the stack holds exactly the people visible to a
    // shorter person arriving from the left (heights increasing top-down).
    const stack: number[] = [];
    for (let i = n - 1; i >= 0; i--) {
        let seen = 0;
        // Each popped person is shorter and has only shorter people between
        // themselves and i, so i sees them. Strict < suffices because all
        // heights are distinct.
        while (stack.length > 0 && stack[stack.length - 1] < heights[i]) {
            stack.pop();
            seen++;
        }
        // If anything remains, its top is the first person right of i taller
        // than i: visible across the popped people, and it blocks everyone
        // beyond it. Popped entries stay discarded -- i shadows them for
        // anyone further left.
        answer[i] = seen + (stack.length > 0 ? 1 : 0);
        stack.push(heights[i]);
    }
    // Each index is pushed and popped at most once: linear in total.
    return answer;
}
