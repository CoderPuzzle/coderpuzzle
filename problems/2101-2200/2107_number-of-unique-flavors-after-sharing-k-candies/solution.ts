function shareCandies(candies: number[], k: number): number {
    const counts = new Map<number, number>();
    for (const flavor of candies) counts.set(flavor, (counts.get(flavor) ?? 0) + 1);
    let distinct = counts.size;
    for (let index = 0; index < k; index++) {
        const flavor = candies[index];
        counts.set(flavor, counts.get(flavor)! - 1);
        if (counts.get(flavor) === 0) distinct--;
    }

    let answer = distinct;
    for (let right = k; right < candies.length; right++) {
        const restored = candies[right - k];
        if (counts.get(restored) === 0) distinct++;
        counts.set(restored, counts.get(restored)! + 1);
        const removed = candies[right];
        counts.set(removed, counts.get(removed)! - 1);
        if (counts.get(removed) === 0) distinct--;
        answer = Math.max(answer, distinct);
    }
    return answer;
}
