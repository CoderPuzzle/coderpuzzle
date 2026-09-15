/**
 * @param {string[]} words
 * @param {string} target
 * @return {number}
 */
var minValidStrings = function (words, target) {
    // dp[p] is the minimum number of valid strings forming target[:p]; dp[0] is
    // 0 and every other cell starts out unreachable. An Aho-Corasick automaton
    // over words turns one left-to-right scan of target into, at each index j,
    // the length of the longest suffix of target[:j+1] that is a prefix of some
    // word: every automaton state lies on a trie path, so that length is simply
    // the state's depth. A piece ending at j + 1 therefore starts somewhere
    // inside its last r positions, and a min segment tree over finalized dp
    // cells answers each such window in O(log n): point-update dp[j + 1], then
    // move on. The scan stops dead the moment a character extends no word
    // prefix at all - nothing beyond that position is reachable, so the answer
    // is -1 unless the full length was formed. Every value stays far below
    // 2^53 (positions <= 5*10^4, answer <= len(target)), so plain number
    // arithmetic is exact throughout.
    const children = [new Map()];
    const fail = [0];
    for (const word of words) {
        let cur = 0;
        for (let k = 0; k < word.length; k++) {
            const ch = word[k];
            let nxt = children[cur].get(ch);
            if (nxt === undefined) {
                children.push(new Map());
                fail.push(0);
                nxt = children.length - 1;
                children[cur].set(ch, nxt);
            }
            cur = nxt;
        }
    }
    const queue = [...children[0].values()];
    for (let head = 0; head < queue.length; head++) {
        const u = queue[head];
        for (const [ch, v] of children[u]) {
            let f = fail[u];
            while (f > 0 && !children[f].has(ch)) {
                f = fail[f];
            }
            const nf = children[f].get(ch) ?? 0;
            fail[v] = nf === v ? 0 : nf;
            queue.push(v);
        }
    }
    const depth = new Array(children.length).fill(0);
    for (let u = 0; u < children.length; u++) {
        for (const v of children[u].values()) {
            depth[v] = depth[u] + 1;
        }
    }
    const INF = 1 << 30;
    const n = target.length;
    let size = 1;
    while (size < n + 2) size <<= 1;
    const tree = new Array(2 * size).fill(INF);
    const update = (i, value) => {
        i += size;
        tree[i] = value;
        for (i >>= 1; i > 0; i >>= 1) {
            tree[i] = Math.min(tree[2 * i], tree[2 * i + 1]);
        }
    };
    const query = (lo, hi) => {
        let res = INF;
        for (lo += size, hi += size; lo < hi; lo >>= 1, hi >>= 1) {
            if (lo & 1) res = Math.min(res, tree[lo++]);
            if (hi & 1) res = Math.min(res, tree[--hi]);
        }
        return res;
    };
    update(0, 0);
    let cur = 0;
    for (let j = 0; j < n; j++) {
        const ch = target[j];
        while (cur > 0 && !children[cur].has(ch)) {
            cur = fail[cur];
        }
        cur = children[cur].get(ch) ?? 0;
        if (cur === 0) {
            return -1;
        }
        const best = query(Math.max(0, j + 1 - depth[cur]), j + 1);
        if (best !== INF) {
            update(j + 1, best + 1);
        }
    }
    const ans = query(n, n + 1);
    return ans >= INF ? -1 : ans;
};
