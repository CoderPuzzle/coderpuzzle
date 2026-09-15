function splitLoopedString(strs: string[]): string {
    // Every string except the breakpoint carrier stands at max(s, s
    // reversed) - fixed slot lengths make per-string maxima optimal. The
    // breakpoint string itself is tried in BOTH orientations at every cut,
    // its suffix leading the regular string and its prefix closing it,
    // wrapped around the others' standing forms in loop order.
    const n: number = strs.length;
    const best: string[] = strs.map((s: string): string => {
        const rev = s.split("").reverse().join("");
        return s >= rev ? s : rev;
    });
    let ans = "";
    for (let i = 0; i < n; ++i) {
        const rest: string[] = [];
        for (let j = 1; j < n; ++j) {
            rest.push(best[(i + j) % n]);
        }
        const others = rest.join("");
        for (const t of [strs[i], strs[i].split("").reverse().join("")]) {
            for (let k = 0; k < t.length; ++k) {
                const cand = t.slice(k) + others + t.slice(0, k);
                if (cand > ans) {
                    ans = cand;
                }
            }
        }
    }
    return ans;
}
