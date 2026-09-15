function isValid(s: string): boolean {
    // Map each closer to its required opener, so the expected partner of any
    // closing bracket is a single lookup.
    const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
    const stack: string[] = [];
    for (const ch of s) {
        // Openers are pushed: the most recently opened bracket is always the
        // one that must close next -- a LIFO discipline the stack models
        // directly.
        if (ch === "(" || ch === "[" || ch === "{") {
            stack.push(ch);
        } else {
            // One combined test: an empty stack means nothing is open, so the
            // closer is unmatched, and the pop doubles as the match check.
            if (stack.length === 0 || stack.pop() !== pairs[ch]) {
                return false;
            }
        }
    }
    // Valid exactly when nothing is left open; catches inputs like "(((".
    return stack.length === 0;
}
