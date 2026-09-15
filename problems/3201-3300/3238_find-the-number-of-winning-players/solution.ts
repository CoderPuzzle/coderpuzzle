function winningPlayerCount(n: number, pick: number[][]): number {
    const counts: number[][] = Array.from({ length: n }, () => new Array(11).fill(0));
    for (const [player, color] of pick) {
        counts[player][color]++;
    }

    let winners = 0;
    for (let player = 0; player < n; player++) {
        if (Math.max(...counts[player]) > player) {
            winners++;
        }
    }
    return winners;
}
