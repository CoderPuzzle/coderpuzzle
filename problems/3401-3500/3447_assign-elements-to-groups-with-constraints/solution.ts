function assignElements(groups: number[], elements: number[]): number[] {
    // Sieve from the smallest element index: the first occurrence of each
    // value claims every multiple it divides, so each group size reads off
    // the earliest qualifying element index.
    const limit = 100001;
    const best = new Int32Array(limit).fill(-1);
    const seen = new Uint8Array(limit);
    for (let index = 0; index < elements.length; ++index) {
        const value = elements[index];
        if (seen[value]) {
            continue;
        }
        seen[value] = 1;
        for (let multiple = value; multiple < limit; multiple += value) {
            if (best[multiple] === -1) {
                best[multiple] = index;
            }
        }
    }
    return groups.map((size) => best[size]);
}
