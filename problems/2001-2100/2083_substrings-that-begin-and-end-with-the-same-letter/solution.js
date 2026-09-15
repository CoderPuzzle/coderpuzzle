var numberOfSubstrings = function (s) {
    const counts = new Array(26).fill(0);
    let total = 0;
    for (const character of s) {
        const index = character.charCodeAt(0) - "a".charCodeAt(0);
        counts[index]++;
        total += counts[index];
    }
    return total;
};
