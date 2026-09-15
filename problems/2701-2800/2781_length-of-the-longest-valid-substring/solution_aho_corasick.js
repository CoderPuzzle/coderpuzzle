/**
 * @param {string} word
 * @param {string[]} forbidden
 * @return {number}
 */
var longestValidSubstring = function (word, forbidden) {
    const miss = 1 << 30;
    // Aho-Corasick automaton over the forbidden strings. Children live in
    // one map keyed node * 32 + char, so memory tracks the trie's edge
    // count instead of any alphabet-wide table.
    const children = new Map();
    const fail = [0];
    const best = [miss];
    const parent = [0];
    const pch = [0];
    let maxLen = 0;
    for (const s of forbidden) {
        if (s.length > maxLen) {
            maxLen = s.length;
        }
    }
    const levels = Array.from({ length: maxLen + 1 }, () => []);
    for (const s of forbidden) {
        let cur = 0;
        for (let i = 0; i < s.length; i++) {
            const c = s.charCodeAt(i) - 97;
            const key = cur * 32 + c;
            let nxt = children.get(key);
            if (nxt === undefined) {
                nxt = fail.length;
                children.set(key, nxt);
                fail.push(0);
                best.push(miss);
                parent.push(cur);
                pch.push(c);
                levels[i + 1].push(nxt);
            }
            cur = nxt;
        }
        best[cur] = Math.min(best[cur], s.length);
    }
    // Failure links, breadth-first over depth buckets: fail[u] is the
    // longest proper suffix of u's path that is also a trie path. Folding
    // best along each link tells every node the shortest forbidden string
    // ending there, with no occurrence enumeration at scan time.
    for (let depth = 1; depth <= maxLen; depth++) {
        for (const u of levels[depth]) {
            const c = pch[u];
            let f = fail[parent[u]];
            while (f !== 0 && !children.has(f * 32 + c)) {
                f = fail[f];
            }
            const v = children.get(f * 32 + c) || 0;
            fail[u] = v === u ? 0 : v;
            best[u] = Math.min(best[u], best[fail[u]]);
        }
    }
    const n = word.length;
    let left = 0;
    let ans = 0;
    let state = 0;
    // Longest-match scan: the state is always the longest suffix of the text
    // that prefixes some forbidden string, so each character costs one
    // amortized-constant hop instead of the window variant's L probes.
    for (let right = 0; right < n; right++) {
        const c = word.charCodeAt(right) - 97;
        while (state !== 0 && !children.has(state * 32 + c)) {
            state = fail[state];
        }
        state = children.get(state * 32 + c) || 0;
        // The shortest forbidden suffix ending at right starts latest --
        // exactly the match the window variant jumps at -- so hopping the
        // left end past its first character keeps the same sweep.
        const m = best[state];
        if (m !== miss) {
            left = Math.max(left, right - m + 2);
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
};
