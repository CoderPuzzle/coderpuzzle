function findLeastNumOfUniqueInts(arr: number[], k: number): number {
    const counts = new Map<number, number>();
    for (const value of arr) {
        counts.set(value, (counts.get(value) || 0) + 1);
    }
    const freqs: number[] = [...counts.values()].sort((a, b) => a - b);
    let remaining = freqs.length;
    for (const count of freqs) {
        if (k >= count) {
            k -= count;
            remaining--;
        } else {
            break;
        }
    }
    return remaining;
}
