var checkAlmostEquivalent = function (word1, word2) {
    const differences = new Array(26).fill(0);
    for (let index = 0; index < word1.length; index++) {
        differences[word1.charCodeAt(index) - 97]++;
        differences[word2.charCodeAt(index) - 97]--;
    }
    return differences.every((difference) => Math.abs(difference) <= 3);
};
