function isValid(s: string): boolean {
    // Every insertion of "abc" is reversible: removing an "abc" substring
    // from a valid string leaves another valid string, all the way back
    // to "". A stack turns that reversal into one pass — whenever the top
    // three entries read a, b, c, they are the most recently completed
    // insertion, so popping all three undoes it.
    const stack: string[] = [];
    for (const character of s) {
        stack.push(character);
        const top = stack.length;
        if (top >= 3 && stack[top - 3] === "a" && stack[top - 2] === "b" && stack[top - 1] === "c") {
            stack.length = top - 3;
        }
    }
    // s was reachable by the operation iff nothing is left over.
    return stack.length === 0;
}
