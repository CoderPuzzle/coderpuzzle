function expand(s: string): string[] {
    // Parse into option groups: a bare letter is a one-element group, and
    // "{a,b,c}" becomes ["a","b","c"]. Backtrack over the choices, then
    // sort the finished words.
    const tokens: string[][] = [];
    let i = 0;
    while (i < s.length) {
        if (s[i] === "{") {
            const j = s.indexOf("}", i);
            tokens.push(s.slice(i + 1, j).split(","));
            i = j + 1;
        } else {
            tokens.push([s[i]]);
            i += 1;
        }
    }
    const result: string[] = [];
    const dfs = (idx: number, cur: string) => {
        if (idx === tokens.length) {
            result.push(cur);
            return;
        }
        for (const opt of tokens[idx]) {
            dfs(idx + 1, cur + opt);
        }
    };
    dfs(0, "");
    result.sort();
    return result;
}
