var longestPalindrome = function (words) {
    const waiting = Array.from({ length: 26 }, () => Array(26).fill(0));
    let length = 0;
    for (const word of words) {
        const first = word.charCodeAt(0) - 97;
        const second = word.charCodeAt(1) - 97;
        if (waiting[second][first] > 0) {
            waiting[second][first]--;
            length += 4;
        } else {
            waiting[first][second]++;
        }
    }
    for (let letter = 0; letter < 26; letter++) {
        if (waiting[letter][letter] > 0) {
            return length + 2;
        }
    }
    return length;
};
