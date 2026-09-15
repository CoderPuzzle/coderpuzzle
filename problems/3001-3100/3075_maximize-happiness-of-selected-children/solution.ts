function maximumHappinessSum(happiness: number[], k: number): number {
    // Every unselected child loses 1 per turn, so the child picked in
    // turn i (0-based) contributes its original value minus i, floored
    // at 0. Values only shrink while waiting, so taking the largest
    // available each turn is optimal. The total is bounded by
    // 2e5 * 1e8 = 2e13, far below 2^53, so Number stays exact.
    happiness.sort((a, b) => b - a);
    let total = 0;
    for (let turn = 0; turn < k; turn++) {
        const value = happiness[turn] - turn;
        if (value > 0) {
            total += value;
        }
    }
    return total;
}
