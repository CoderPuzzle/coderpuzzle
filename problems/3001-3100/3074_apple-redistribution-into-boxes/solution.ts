function minimumBoxes(apple: number[], capacity: number[]): number {
    // Packs split freely across boxes, so only the apple total matters,
    // not its division into packs. Filling the largest boxes first makes
    // each selected box cover as much of the total as possible, so the
    // prefix of the descending-sorted capacities is optimal.
    const total = apple.reduce((sum, pack) => sum + pack, 0);
    capacity.sort((a, b) => b - a);
    let filled = 0;
    for (let i = 0; i < capacity.length; i++) {
        filled += capacity[i];
        if (filled >= total) {
            return i + 1;
        }
    }
    // The input guarantees a full redistribution is possible.
    return capacity.length;
}
