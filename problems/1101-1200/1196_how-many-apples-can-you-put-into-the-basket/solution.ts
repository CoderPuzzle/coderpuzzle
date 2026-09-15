function maxNumberOfApples(weight: number[]): number {
    // Lightest apples first: any optimal packing can be assumed to consist of
    // them, so a sorted greedy prefix is exactly optimal.
    weight.sort((a, b) => a - b);
    let total = 0;
    for (let i = 0; i < weight.length; i++) {
        if (total + weight[i] > 5000) {
            return i;
        }
        total += weight[i];
    }
    return weight.length;
}
