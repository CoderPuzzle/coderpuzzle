function checkAlmostEquivalent(word1: string, word2: string): boolean {
    const differences = new Array<number>(26).fill(0);
    for (let index = 0; index < word1.length; index++) {
        differences[word1.charCodeAt(index) - 97]++;
        differences[word2.charCodeAt(index) - 97]--;
    }
    return differences.every((difference) => Math.abs(difference) <= 3);
}
