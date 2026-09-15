// Walk the string once, keeping a stack of characters kept so far. A new
// character only ever conflicts with the character directly above it on
// the stack, because anything further down was already separated from it
// by characters that didn't cancel. So comparing against just the top is
// enough to reproduce the full repeated removal process in a single pass.
function makeGood(s: string): string {
    const stack: string[] = [];
    for (const ch of s) {
        const top = stack[stack.length - 1];
        if (top !== undefined && top !== ch && top.toLowerCase() === ch.toLowerCase()) {
            stack.pop();
        } else {
            stack.push(ch);
        }
    }
    return stack.join("");
}
