function score(cards: string[], x: string): number {
    // A one-sided pool (26 counts, zeros included) plus `helpers` double-x
    // cards: every pair consumes at least one letter card, every pair needs
    // a partner outside the largest class, and only so many pairs fit at
    // all — the tight bound is the smallest.
    const bestPairs = (counts: number[], helpers: number): number => {
        let total = 0;
        let largest = 0;
        for (const count of counts) {
            total += count;
            largest = Math.max(largest, count);
        }
        if (total === 0) return 0;
        return Math.min(Math.floor((total + helpers) / 2), total + helpers - largest, total);
    };

    const marker = x.charCodeAt(0);
    let both = 0;
    const firstOnly: number[] = new Array(26).fill(0);
    const secondOnly: number[] = new Array(26).fill(0);
    for (const card of cards) {
        const a = card.charCodeAt(0);
        const b = card.charCodeAt(1);
        if (a === marker) {
            if (b === marker) {
                both++;
            } else {
                firstOnly[b - 97]++;
            }
        } else if (b === marker) {
            secondOnly[a - 97]++;
        }
    }

    // Each double-x card is spent on one side or the other; every matching
    // splits that way, so scanning all splits covers everything.
    let best = 0;
    for (let give = 0; give <= both; give++) {
        best = Math.max(best, bestPairs(firstOnly, give) + bestPairs(secondOnly, both - give));
    }
    return best;
}
