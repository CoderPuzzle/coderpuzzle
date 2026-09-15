/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var minDeletions = function (s, queries) {
    // eq[i] = 1 iff i >= 1 and s[i] == s[i - 1]. Deleting one character
    // per equal adjacent pair is optimal, so the type-2 answer over
    // s[l..r] is exactly sum(eq[l+1..r]). A Fenwick tree over eq answers
    // each query in O(log n), and flipping s[j] only ever changes eq[j]
    // and eq[j + 1], because every other adjacency is untouched.
    const n = s.length;
    const cur = new Array(n).fill(0);
    const bits = new Array(n).fill(0);
    const add = (i, delta) => {
        for (; i < n; i += i & -i) bits[i] += delta;
    };
    const pref = (i) => {
        let total = 0;
        for (; i > 0; i -= i & -i) total += bits[i];
        return total;
    };
    const setEq = (i, value) => {
        if (i >= 1 && i < n && cur[i] !== value) {
            add(i, value - cur[i]);
            cur[i] = value;
        }
    };
    for (let i = 1; i < n; i++) {
        cur[i] = s[i] === s[i - 1] ? 1 : 0;
        if (cur[i]) add(i, 1);
    }
    const chars = s.split("");
    const answer = [];
    for (const query of queries) {
        if (query[0] === 1) {
            const j = query[1];
            chars[j] = chars[j] === "A" ? "B" : "A";
            if (j + 1 < n) setEq(j + 1, chars[j + 1] === chars[j] ? 1 : 0);
            setEq(j, j >= 1 && chars[j] === chars[j - 1] ? 1 : 0);
        } else {
            answer.push(pref(query[2]) - pref(query[1]));
        }
    }
    return answer;
};
