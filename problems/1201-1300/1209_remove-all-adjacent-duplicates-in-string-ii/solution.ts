function removeDuplicates(s: string, k: number): string {
    const stack: [string, number][] = []; // entries: [char, count]
    for (const ch of s) {
        if (stack.length > 0 && stack[stack.length - 1][0] === ch) {
            stack[stack.length - 1][1] += 1;
            if (stack[stack.length - 1][1] === k) {
                stack.pop();
            }
        } else {
            stack.push([ch, 1]);
        }
    }
    let out = "";
    for (const [ch, count] of stack) {
        out += ch.repeat(count);
    }
    return out;
}
