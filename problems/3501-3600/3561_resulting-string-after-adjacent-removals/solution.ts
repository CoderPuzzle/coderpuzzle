function resultingString(s: string): string {
    // Left-to-right stack: a fresh character cancels the top when the two
    // are circular-adjacent; the pair exposed by a pop is exactly the next
    // pair the leftmost-first rule would remove.
    const stack: number[] = [];
    for (let index = 0; index < s.length; index++) {
        const code = s.charCodeAt(index);
        if (stack.length > 0) {
            const diff = (stack[stack.length - 1] - code + 26) % 26;
            if (diff === 1 || diff === 25) {
                stack.pop();
                continue;
            }
        }
        stack.push(code);
    }
    return String.fromCharCode(...stack);
}
