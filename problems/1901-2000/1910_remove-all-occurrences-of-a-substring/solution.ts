// Stream s through a survivor stack. A removal can only expose
// characters at the top, so after each push the last part.length chars
// are checked and popped when they spell out part — the freshly exposed
// top then gets its own chance on a later push.
function removeOccurrences(s: string, part: string): string {
    const m = part.length;
    const stack: string[] = [];
    for (const ch of s) {
        stack.push(ch);
        if (stack.length >= m && stack.slice(-m).join("") === part) {
            stack.length -= m;
        }
    }
    return stack.join("");
}
