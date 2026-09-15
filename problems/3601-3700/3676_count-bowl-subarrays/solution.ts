function bowlSubarrays(nums: number[]): number {
    // A bowl is pinned by the maximum sitting strictly between its rims:
    // that element needs a strictly greater neighbour on both sides, and
    // those nearest greater elements are exactly the two rims. Sweep left
    // to right with a decreasing stack — when a value pops an entry, it is
    // that entry's next greater element and what remains beneath names its
    // previous greater one. The pop is a bowl unless the stack emptied,
    // i.e. no greater element on the left; entries never popped never meet
    // a greater element at all.
    const stack: number[] = [];
    let count = 0;
    for (const x of nums) {
        while (stack.length > 0 && stack[stack.length - 1] < x) {
            stack.pop();
            if (stack.length > 0) {
                count++;
            }
        }
        stack.push(x);
    }
    return count;
}
