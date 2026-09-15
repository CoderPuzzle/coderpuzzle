function groupStrings(words: string[]): number[] {
    const maskCounter = new Map<number, number>();
    for (const w of words) {
        let mask = 0;
        for (let k = 0; k < w.length; k++) {
            mask |= 1 << (w.charCodeAt(k) - 97);
        }
        maskCounter.set(mask, (maskCounter.get(mask) || 0) + 1);
    }

    const masks: number[] = Array.from(maskCounter.keys());
    const present = new Set<number>(masks);
    const index = new Map<number, number>();
    for (let k = 0; k < masks.length; k++) {
        index.set(masks[k], k);
    }
    const parent: number[] = masks.map((_, k) => k);
    const sizeCount: number[] = masks.map((m) => maskCounter.get(m)!);

    const find = (x: number): number => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    const union = (a: number, b: number): void => {
        const ra = find(a),
            rb = find(b);
        if (ra !== rb) {
            parent[rb] = ra;
            sizeCount[ra] += sizeCount[rb];
        }
    };

    const full = (1 << 26) - 1;
    for (const mask of masks) {
        const i = index.get(mask)!;
        // Add / delete one letter: masks differing in exactly one bit.
        for (let bit = 0; bit < 26; bit++) {
            const neighbor = mask ^ (1 << bit);
            if (present.has(neighbor)) {
                union(i, index.get(neighbor)!);
            }
        }
        // Replace one letter: remove a present bit, add an absent bit.
        const absent = full & ~mask;
        let removable = mask;
        while (removable) {
            const low = removable & -removable;
            removable ^= low;
            const base = mask & ~low;
            let addable = absent;
            while (addable) {
                const low2 = addable & -addable;
                addable ^= low2;
                const neighbor = base | low2;
                if (present.has(neighbor)) {
                    union(i, index.get(neighbor)!);
                }
            }
        }
    }

    const roots = new Set<number>();
    for (let k = 0; k < masks.length; k++) {
        roots.add(find(k));
    }
    let largest = 0;
    for (let k = 0; k < masks.length; k++) {
        if (find(k) === k) {
            largest = Math.max(largest, sizeCount[k]);
        }
    }
    return [roots.size, largest];
}
