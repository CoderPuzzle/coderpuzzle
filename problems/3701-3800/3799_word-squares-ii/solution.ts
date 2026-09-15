function wordSquares(words: string[]): string[][] {
    const byFirst = new Map<string, string[]>();
    const byLast = new Map<string, string[]>();
    for (const word of words) {
        if (!byFirst.has(word[0])) {
            byFirst.set(word[0], []);
        }
        byFirst.get(word[0])!.push(word);
        if (!byLast.has(word[3])) {
            byLast.set(word[3], []);
        }
        byLast.get(word[3])!.push(word);
    }
    const res: string[][] = [];
    for (const top of [...words].sort()) {
        for (const left of byFirst.get(top[0]) ?? []) {
            if (left === top) {
                continue;
            }
            for (const right of byFirst.get(top[3]) ?? []) {
                if (right === top || right === left) {
                    continue;
                }
                for (const bottom of byLast.get(right[3]) ?? []) {
                    if (bottom[0] !== left[3]) {
                        continue;
                    }
                    if (bottom === top || bottom === left || bottom === right) {
                        continue;
                    }
                    res.push([top, left, right, bottom]);
                }
            }
        }
    }
    res.sort((a, b) => {
        for (let i = 0; i < 4; i++) {
            const cmp = a[i].localeCompare(b[i]);
            if (cmp !== 0) {
                return cmp;
            }
        }
        return 0;
    });
    return res;
}
