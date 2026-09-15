function relocateMarbles(nums: number[], moveFrom: number[], moveTo: number[]): number[] {
    // Only occupancy matters: a move relocates every marble sitting on a
    // position at once, so one set of occupied positions tracks the state.
    const occupied = new Set<number>(nums);
    // In order: vacate the source, occupy the target. A self-move deletes and
    // re-adds the same position; merging into an occupied target is just a
    // set add.
    for (let step = 0; step < moveFrom.length; ++step) {
        occupied.delete(moveFrom[step]);
        occupied.add(moveTo[step]);
    }
    return [...occupied].sort((a, b) => a - b);
}
