function findWinners(matches: number[][]): number[][] {
    const losses = new Map<number, number>();
    for (const [winner, loser] of matches) {
        if (!losses.has(winner)) {
            losses.set(winner, 0);
        }
        losses.set(loser, (losses.get(loser) ?? 0) + 1);
    }
    const neverLost: number[] = [];
    const lostOnce: number[] = [];
    for (const [player, count] of losses) {
        if (count === 0) {
            neverLost.push(player);
        } else if (count === 1) {
            lostOnce.push(player);
        }
    }
    neverLost.sort((a, b) => a - b);
    lostOnce.sort((a, b) => a - b);
    return [neverLost, lostOnce];
}
