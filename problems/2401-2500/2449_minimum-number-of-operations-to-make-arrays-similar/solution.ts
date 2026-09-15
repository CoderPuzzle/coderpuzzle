function makeSimilar(nums: number[], target: number[]): number {
    // Every move is +-2, so an element's parity never changes and the
    // even/odd classes evolve independently in size. Within a class,
    // matching sorted positions smallest-to-smallest (hints 2-3) never
    // wastes work: any crossing assignment can be uncrossed without
    // raising the total rise. Each operation supplies exactly one +2,
    // so the answer is the total positive rise divided by 2 — the
    // drops are free riders on the same operations.
    const evens = nums.filter((x) => x % 2 === 0).sort((a, b) => a - b);
    const odds = nums.filter((x) => x % 2 !== 0).sort((a, b) => a - b);
    const tevens = target.filter((x) => x % 2 === 0).sort((a, b) => a - b);
    const todds = target.filter((x) => x % 2 !== 0).sort((a, b) => a - b);
    let ops = 0;
    for (let i = 0; i < evens.length; i++) {
        if (tevens[i] > evens[i]) ops += (tevens[i] - evens[i]) / 2;
    }
    for (let i = 0; i < odds.length; i++) {
        if (todds[i] > odds[i]) ops += (todds[i] - odds[i]) / 2;
    }
    return ops;
}
