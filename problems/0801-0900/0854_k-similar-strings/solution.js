/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var kSimilarity = function (s1, s2) {
    // Each swap is a move between strings, so BFS from s1 yields
    // the minimum swap count.
    const queue = [[s1, 0]];
    const seen = new Set([s1]);
    let head = 0;
    while (head < queue.length) {
        const [s, steps] = queue[head++];
        if (s === s2) {
            return steps;
        }
        // Always fix the leftmost mismatch first: some optimal
        // solution does, and the rule prunes the branching.
        let i = 0;
        while (s[i] === s2[i]) {
            i++;
        }
        const arr = s.split("");
        for (let j = i + 1; j < s.length; j++) {
            // Install s2's letter at i, and never break an
            // already-matching j — such a swap is never minimal.
            if (s[j] === s2[i] && s[j] !== s2[j]) {
                arr[i] = s[j];
                arr[j] = s[i];
                const ns = arr.join("");
                arr[i] = s[i];
                arr[j] = s[j];
                // Only novel strings join the queue; matched
                // positions are never touched again.
                if (!seen.has(ns)) {
                    seen.add(ns);
                    queue.push([ns, steps + 1]);
                }
            }
        }
    }
    // Unreachable: anagrams are always convertible.
    return -1;
};
