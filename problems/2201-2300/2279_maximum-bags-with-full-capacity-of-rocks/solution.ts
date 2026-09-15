function maximumBags(capacity: number[], rocks: number[], additionalRocks: number): number {
    const needs = capacity.map((c, i) => c - rocks[i]).sort((a, b) => a - b);
    let remaining = additionalRocks;
    let full = 0;
    for (const need of needs) {
        if (need > remaining) {
            break;
        }
        remaining -= need;
        full++;
    }
    return full;
}
