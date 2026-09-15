function smallestNumber(pattern: string): string {
    const result: string[] = [];
    const stack: string[] = [];
    const n = pattern.length;
    for (let i = 0; i <= n; i++) {
        // Push 1, 2, 3, ... while inside a 'D' run; the run's positions
        // get consecutive digits, the smallest possible pool.
        stack.push(String(i + 1));
        // An 'I' (or the end) terminates the current 'D' block; popping
        // emits the block's digits in descending order, satisfying 'D'.
        if (i === n || pattern[i] === "I") {
            while (stack.length > 0) {
                result.push(stack.pop()!);
            }
        }
    }
    return result.join("");
}
