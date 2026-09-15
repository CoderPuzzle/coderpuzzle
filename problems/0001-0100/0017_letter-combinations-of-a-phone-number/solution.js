/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    // 2..9 map to consecutive group slots; 1 and 0 have no letters.
    const groups = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    // Zero digits means zero combinations: [] (not [""]), and the walk below
    // must never start on an empty tree.
    if (digits === "") {
        return [];
    }
    const combinations = [];
    const current = [];
    const walk = function (position) {
        // A leaf is a complete root-to-leaf path: one letter per digit.
        if (position === digits.length) {
            combinations.push(current.join(""));
            return;
        }
        const group = groups[digits.charCodeAt(position) - "2".charCodeAt(0)];
        // Visit letters in group order so earlier digits vary slowest.
        for (const letter of group) {
            current.push(letter);
            walk(position + 1);
            current.pop();
        }
    };
    walk(0);
    return combinations;
};
