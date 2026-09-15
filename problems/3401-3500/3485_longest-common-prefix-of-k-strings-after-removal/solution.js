/**
 * @param {string[]} words
 * @param {number} k
 * @return {number[]}
 */
var longestCommonPrefix = function (words, k) {
    const n = words.length;
    // With one word gone there are fewer than k words, so no prefix survives.
    if (n - 1 < k) {
        return new Array(n).fill(0);
    }

    let total = 0;
    let maxLen = 0;
    for (const w of words) {
        total += w.length;
        if (w.length > maxLen) maxLen = w.length;
    }
    const cap = total + 1;
    const children = new Array(cap * 26).fill(-1);
    const cnt = new Array(cap).fill(0);
    const depth = new Array(cap).fill(0);
    let nodes = 1;
    // A trie node at depth d is a prefix of length d shared by cnt words.
    for (const w of words) {
        let cur = 0;
        cnt[0]++;
        for (let i = 0; i < w.length; i++) {
            const idx = cur * 26 + (w.charCodeAt(i) - 97);
            if (children[idx] === -1) {
                children[idx] = nodes;
                depth[nodes] = depth[cur] + 1;
                nodes++;
            }
            cur = children[idx];
            cnt[cur]++;
        }
    }

    const top1 = new Array(maxLen + 1).fill(-1);
    const top2 = new Array(maxLen + 1).fill(-1);
    // Keep the two distinct nodes per depth with cnt >= k: if the removed
    // word's path covers the best one, the second is still off that path.
    for (let node = 0; node < nodes; node++) {
        if (cnt[node] >= k) {
            const d = depth[node];
            if (top1[d] === -1) {
                top1[d] = node;
            } else if (top2[d] === -1) {
                top2[d] = node;
            }
        }
    }
    const depths = [];
    for (let d = maxLen; d >= 0; d--) {
        if (top1[d] !== -1) depths.push(d);
    }

    const stamp = new Array(nodes).fill(0);
    const ans = new Array(n);
    for (let wi = 0; wi < n; wi++) {
        const w = words[wi];
        const tag = wi + 1;
        // A unique timestamp marks this word's trie path; old marks never match.
        stamp[0] = tag;
        let cur = 0;
        let big = 0;
        // On-path node survives the removal only with cnt >= k + 1.
        for (let i = 0; i < w.length; i++) {
            cur = children[cur * 26 + (w.charCodeAt(i) - 97)];
            stamp[cur] = tag;
            if (cnt[cur] >= k + 1 && depth[cur] > big) {
                big = depth[cur];
            }
        }
        let fb = 0;
        // Deepest off-path depth: top2 exists there, or top1 is off the path.
        for (const d of depths) {
            if (top2[d] !== -1) {
                fb = d;
                break;
            }
            if (stamp[top1[d]] !== tag) {
                fb = d;
                break;
            }
        }
        ans[wi] = big > fb ? big : fb;
    }
    return ans;
};
