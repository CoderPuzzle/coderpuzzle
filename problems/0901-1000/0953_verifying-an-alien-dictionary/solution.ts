function isAlienSorted(words: string[], order: string): boolean {
    // Rank of every letter under the alien alphabet.
    const rank = new Array<number>(26).fill(0);
    for (let index = 0; index < order.length; index++) {
        rank[order.charCodeAt(index) - 97] = index;
    }
    // Adjacent pairs decide the whole list: any out-of-order pair
    // falsifies it, and each pair's verdict is final.
    for (let i = 0; i + 1 < words.length; i++) {
        const first = words[i];
        const second = words[i + 1];
        // March to the first differing position — the only one that
        // orders this pair.
        const length = Math.min(first.length, second.length);
        let j = 0;
        while (j < length && first[j] === second[j]) {
            j++;
        }
        // A shared prefix: the shorter word is smaller, so only the
        // left word may be short; otherwise the first differing
        // letters decide, and the left word must lose that duel.
        if (j === length) {
            if (first.length > second.length) {
                return false;
            }
        } else if (rank[first.charCodeAt(j) - 97] > rank[second.charCodeAt(j) - 97]) {
            return false;
        }
    }
    return true;
}
