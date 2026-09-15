function maxChunksToSorted(arr: number[]): number {
    // A boundary is legal exactly when the multiset of arr's prefix
    // equals the sorted copy's prefix — values repeat, so multisets,
    // not max/min ranges, decide.
    const ordered = arr.slice().sort((a, b) => a - b);
    const counts = new Map<number, number>();
    let balance = 0;
    let chunks = 0;
    for (let i = 0; i < arr.length; i++) {
        const a = arr[i],
            b = ordered[i];
        // Each update adds +1 when it leaves a count nonzero (a new
        // unpaired element) and -1 when it brings one back to zero.
        const ca = (counts.get(a) || 0) + 1;
        counts.set(a, ca);
        balance += ca > 0 ? 1 : -1;
        const cb = (counts.get(b) || 0) - 1;
        counts.set(b, cb);
        balance += cb < 0 ? 1 : -1;
        // Zero balance = no unpaired elements: the prefix multisets
        // agree, so cut a chunk at the earliest such index.
        if (balance === 0) chunks++;
    }
    return chunks;
}
