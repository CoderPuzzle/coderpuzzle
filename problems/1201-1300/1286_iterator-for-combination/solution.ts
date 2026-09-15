function popcount(mask: number): number {
    let count = 0;
    while (mask > 0) {
        mask &= mask - 1;
        count++;
    }
    return count;
}

class CombinationIterator {
    private combinations: string[];
    private position: number;

    // Precompute all combinations via bitmask enumeration. With n <= 15
    // there are at most 2^15 masks; a mask is kept when its popcount
    // equals the combination length. Ascending mask order groups the
    // strings by their highest chosen index rather than by first letter,
    // so an explicit sort restores the lexicographic sequence.
    constructor(characters: string, combinationLength: number) {
        this.combinations = [];
        const n = characters.length;
        for (let mask = 0; mask < 1 << n; mask++) {
            if (popcount(mask) !== combinationLength) {
                continue;
            }
            let combo = "";
            for (let i = 0; i < n; i++) {
                if ((mask >> i) & 1) {
                    combo += characters[i];
                }
            }
            this.combinations.push(combo);
        }
        this.combinations.sort();
        this.position = 0;
    }

    next(): string {
        return this.combinations[this.position++];
    }

    hasNext(): boolean {
        return this.position < this.combinations.length;
    }
}
