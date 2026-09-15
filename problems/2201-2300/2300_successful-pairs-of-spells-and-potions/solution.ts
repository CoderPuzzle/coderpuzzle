function successfulPairs(spells: number[], potions: number[], success: number): number[] {
    // a pair works iff spell * potion >= success; successful potions are
    // exactly the strongest suffix of the sorted copy
    const sorted = potions.slice().sort((a, b) => a - b);
    const m = sorted.length;
    return spells.map((spell) => {
        // minimum potion strength that still succeeds for this spell
        const need = Math.ceil(success / spell);
        // first index with sorted[idx] >= need
        let lo = 0,
            hi = m;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (sorted[mid] < need) lo = mid + 1;
            else hi = mid;
        }
        // suffix [lo, m) is exactly the potions that succeed
        return m - lo;
    });
}
