function alienOrder(words: string[]): string {
    const A = 26;
    const present: boolean[] = new Array(A).fill(false);
    for (const w of words) {
        for (const c of w) present[c.charCodeAt(0) - 97] = true;
    }
    let total = 0;
    for (let c = 0; c < A; c++) if (present[c]) total++;

    const adj: Set<number>[] = Array.from({ length: A }, () => new Set<number>());
    const indeg: number[] = new Array(A).fill(0);
    for (let i = 0; i + 1 < words.length; i++) {
        const prev = words[i],
            nxt = words[i + 1];
        if (prev.length > nxt.length && prev.startsWith(nxt)) return "";
        const m = Math.min(prev.length, nxt.length);
        for (let j = 0; j < m; j++) {
            const a = prev.charCodeAt(j) - 97,
                b = nxt.charCodeAt(j) - 97;
            if (a !== b) {
                if (!adj[a].has(b)) {
                    adj[a].add(b);
                    indeg[b]++;
                }
                break;
            }
        }
    }

    // Kahn's algorithm always taking the smallest available letter
    // (equivalent to a min-heap of ready characters).
    const done: boolean[] = new Array(A).fill(false);
    let order = "";
    for (let count = 0; count < total; count++) {
        let ch = -1;
        for (let c = 0; c < A; c++) {
            if (present[c] && !done[c] && indeg[c] === 0) {
                ch = c;
                break;
            }
        }
        if (ch === -1) return ""; // cycle -> invalid
        done[ch] = true;
        order += String.fromCharCode(97 + ch);
        for (const nb of adj[ch]) indeg[nb]--;
    }
    return order;
}
