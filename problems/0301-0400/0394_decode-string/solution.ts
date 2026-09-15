function decodeString(s: string): string {
    // One [previousString, repeatCount] frame per unclosed '[' —
    // the stack mirrors the bracket structure, so context is never
    // lost no matter how deep the nesting goes.
    const stack: [string, number][] = [];
    let current = "";
    let repeat = 0;
    for (const ch of s) {
        if (ch >= "0" && ch <= "9") {
            // Multi-digit counts assemble digit by digit.
            repeat = repeat * 10 + (ch.charCodeAt(0) - 48);
        } else if (ch === "[") {
            // Park the outer segment and its count; reset both for
            // the fresh inner segment.
            stack.push([current, repeat]);
            current = "";
            repeat = 0;
        } else if (ch === "]") {
            // Absorb the finished inner segment: restore the outer
            // string, then repeat-and-append onto it.
            const [previous, times] = stack.pop() as [string, number];
            current = previous + current.repeat(times);
        } else {
            current += ch;
        }
    }
    // Every bracket is closed, so the stack is empty and current is
    // the fully decoded string.
    return current;
}
