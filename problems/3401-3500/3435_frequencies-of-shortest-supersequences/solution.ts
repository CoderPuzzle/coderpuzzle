function supersequences(words: string[]): number[][] {
    const charSet = new Set<string>();
    const edges: [string, string][] = [];
    for (const w of words) {
        charSet.add(w[0]);
        charSet.add(w[1]);
        edges.push([w[0], w[1]]);
    }
    const chars = [...charSet].sort();
    const m = chars.length;
    const idx = new Map<string, number>();
    for (let i = 0; i < m; i++) idx.set(chars[i], i);
    let forced = 0;
    const nonSelf: [number, number][] = [];
    for (const [a, b] of edges) {
        if (a === b) {
            forced |= 1 << idx.get(a)!;
        } else {
            nonSelf.push([idx.get(a)!, idx.get(b)!]);
        }
    }

    const adj: number[][] = Array.from({ length: m }, () => []);
    const state = new Array<number>(m).fill(0); // 0 unvisited, 1 visiting, 2 done
    function dfs(c: number): boolean {
        state[c] = 1;
        for (const nxt of adj[c]) {
            if (state[nxt] === 1) return true;
            if (state[nxt] === 0 && dfs(nxt)) return true;
        }
        state[c] = 2;
        return false;
    }
    // Induced subgraph on chars not in t must be acyclic.
    function isDag(t: number): boolean {
        for (let c = 0; c < m; c++) adj[c] = [];
        for (const [a, b] of nonSelf) {
            if (!((t >> a) & 1) && !((t >> b) & 1)) adj[a].push(b);
        }
        state.fill(0);
        for (let c = 0; c < m; c++) {
            if ((t >> c) & 1) continue;
            if (state[c] === 0 && dfs(c)) return false;
        }
        return true;
    }

    let bestLen: number | null = null;
    let results: number[][] = [];
    for (let mask = 0; mask < 1 << m; mask++) {
        if ((forced & mask) !== forced) continue;
        if (!isDag(mask)) continue;
        let pc = 0,
            t = mask;
        while (t) {
            pc += t & 1;
            t >>>= 1;
        }
        const length = m + pc;
        const freq = new Array<number>(26).fill(0);
        for (let i = 0; i < m; i++) {
            freq[chars[i].charCodeAt(0) - 97] = (mask >> i) & 1 ? 2 : 1;
        }
        if (bestLen === null || length < bestLen) {
            bestLen = length;
            results = [freq];
        } else if (length === bestLen) {
            results.push(freq);
        }
    }

    results.sort((x, y) => {
        for (let i = 0; i < 26; i++) {
            if (x[i] !== y[i]) return x[i] - y[i];
        }
        return 0;
    });
    const out: number[][] = [];
    for (const f of results) {
        const last = out[out.length - 1];
        let same = out.length > 0;
        if (same) {
            for (let i = 0; i < 26; i++) {
                if (last[i] !== f[i]) {
                    same = false;
                    break;
                }
            }
        }
        if (!same) out.push(f);
    }
    return out;
}
