function mostPopularCreator(creators: string[], ids: string[], views: number[]): string[][] {
    // One pass keeps three running values per creator: total views,
    // best single-video view count, and the id achieving it
    // (lexicographically smallest on a tie). Totals reach
    // 10^5 * 10^5 = 10^10 < 2^53, so Number arithmetic stays exact.
    const totals = new Map<string, number>();
    const bestView = new Map<string, number>();
    const bestId = new Map<string, string>();
    for (let i = 0; i < creators.length; ++i) {
        const creator = creators[i];
        totals.set(creator, (totals.get(creator) || 0) + views[i]);
        const current = bestView.get(creator);
        if (current === undefined || views[i] > current || (views[i] === current && ids[i] < bestId.get(creator)!)) {
            bestView.set(creator, views[i]);
            bestId.set(creator, ids[i]);
        }
    }
    const top = Math.max(...totals.values());
    const answer: string[][] = [];
    for (const [creator, total] of totals) {
        if (total === top) {
            answer.push([creator, bestId.get(creator)!]);
        }
    }
    return answer.sort();
}
