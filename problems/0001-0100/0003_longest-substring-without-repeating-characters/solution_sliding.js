/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    // inWindow holds exactly the characters of the window s[start..i],
    // which never contains a duplicate.
    const inWindow = new Set();
    let start = 0,
        best = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        // Evict characters from the left until c can enter without
        // duplicating: the window shrinks one step at a time.
        while (inWindow.has(c)) {
            inWindow.delete(s[start]);
            start++;
        }
        inWindow.add(c);
        // The window is duplicate-free again: record its length.
        if (i - start + 1 > best) best = i - start + 1;
    }
    return best;
};
