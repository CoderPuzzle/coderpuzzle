function minRemoveToMakeValid(s: string): string {
    const keep: boolean[] = new Array(s.length).fill(true);
    const opens: number[] = []; // indices of '(' still hoping for a partner
    for (let i = 0; i < s.length; ++i) {
        const ch = s[i];
        if (ch === "(") opens.push(i);
        else if (ch === ")") {
            if (opens.length > 0)
                opens.pop(); // matched: both survive
            else keep[i] = false; // orphan close, doomed
        }
    }
    for (const i of opens) keep[i] = false; // opens that never found a close
    let out = "";
    for (let i = 0; i < s.length; ++i) {
        if (keep[i]) out += s[i];
    }
    return out;
}
