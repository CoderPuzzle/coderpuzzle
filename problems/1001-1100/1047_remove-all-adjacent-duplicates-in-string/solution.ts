function removeDuplicates(s: string): string {
    const stack: string[] = [];
    for (const ch of s) {
        if (stack.length > 0 && stack[stack.length - 1] === ch) {
            stack.pop();
        } else {
            stack.push(ch);
        }
    }
    return stack.join("");
}
