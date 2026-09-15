var maxPalindromesAfterOperations = function (words) {
    const count = Array(26).fill(0);
    let pairs = 0;
    const halves = [];
    for (const word of words) {
        halves.push(Math.floor(word.length / 2));
        for (let index = 0; index < word.length; index++) {
            count[word.charCodeAt(index) - 97]++;
        }
    }
    for (let letter = 0; letter < 26; letter++) {
        pairs += Math.floor(count[letter] / 2);
    }
    halves.sort((a, b) => a - b);
    let made = 0;
    for (const half of halves) {
        if (half > pairs) {
            break;
        }
        pairs -= half;
        made++;
    }
    return made;
};
