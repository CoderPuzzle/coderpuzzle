function smallestSubsequence(s: string): string {
    const last = new Map<string, number>();
    for (let i = 0; i < s.length; i++) {
        last.set(s[i], i);
    }
    const inStack = new Set<string>();
    const stack: string[] = [];
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (inStack.has(ch)) {
            continue;
        }
        while (stack.length > 0 && stack[stack.length - 1] > ch && last.get(stack[stack.length - 1])! > i) {
            inStack.delete(stack.pop()!);
        }
        stack.push(ch);
        inStack.add(ch);
    }
    return stack.join("");
}
