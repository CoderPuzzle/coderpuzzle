function removeSubstring(s: string, k: number): string {
    // Run-length stack: each entry is one maximal run, char plus count.
    const stack: [string, number][] = [];
    for (const ch of s) {
        const top = stack[stack.length - 1];
        if (top && top[0] === ch) {
            top[1]++;
        } else {
            stack.push([ch, 1]);
        }
        // A ')' run sitting on a '(' run is a live junction: cancel
        // min(floor(open / k), floor(close / k)) whole blocks of k from
        // both sides.
        while (stack.length > 1 && stack[stack.length - 1][0] === ")" && stack[stack.length - 2][0] === "(") {
            const blocks = Math.min(
                Math.floor(stack[stack.length - 2][1] / k),
                Math.floor(stack[stack.length - 1][1] / k),
            );
            if (blocks === 0) {
                break;
            }
            const close = stack.pop();
            const below = stack.pop();
            below[1] -= blocks * k;
            close[1] -= blocks * k;
            // Survivors go back on top, merging equal-char neighbours; a
            // merge can expose another junction one level down.
            for (const run of [below, close]) {
                if (run[1] > 0) {
                    const top = stack[stack.length - 1];
                    if (top && top[0] === run[0]) {
                        top[1] += run[1];
                    } else {
                        stack.push(run);
                    }
                }
            }
        }
    }
    // The surviving runs are the irreducible string.
    let result = "";
    for (const [ch, count] of stack) {
        result += ch.repeat(count);
    }
    return result;
}
