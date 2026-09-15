function beforeAndAfterPuzzles(phrases: string[]): string[] {
    const n = phrases.length;
    const words = phrases.map((p) => p.split(" "));
    // File every phrase position under its first word: the bucket a
    // predecessor will search by its own last word.
    const byFirst = new Map<string, number[]>();
    for (let i = 0; i < n; i++) {
        const bucket = byFirst.get(words[i][0]);
        if (bucket) {
            bucket.push(i);
        } else {
            byFirst.set(words[i][0], [i]);
        }
    }
    const results = new Set<string>();
    for (let i2 = 0; i2 < n; i2++) {
        const last = words[i2][words[i2].length - 1];
        for (const j of byFirst.get(last) ?? []) {
            if (j === i2) {
                continue; // a phrase never pairs with its own position
            }
            let merged = phrases[i2];
            for (let k = 1; k < words[j].length; k++) {
                merged += " " + words[j][k];
            }
            results.add(merged);
        }
    }
    return Array.from(results).sort();
}
