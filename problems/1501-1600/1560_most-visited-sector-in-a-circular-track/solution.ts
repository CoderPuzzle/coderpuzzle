function mostVisited(n: number, rounds: number[]): number[] {
    // Only the first and last sectors of the whole marathon matter: every
    // full lap around the track visits every sector once, so the total
    // visit count only differs on the final, partial lap. That partial lap
    // is exactly the arc from rounds[0] to the last element.
    const start = rounds[0];
    const end = rounds[rounds.length - 1];
    const result: number[] = [];
    if (start <= end) {
        for (let sector = start; sector <= end; ++sector) result.push(sector);
        return result;
    }
    // The arc wraps past sector n back to sector 1.
    for (let sector = 1; sector <= end; ++sector) result.push(sector);
    for (let sector = start; sector <= n; ++sector) result.push(sector);
    return result;
}
