function findRelativeRanks(score: number[]): string[] {
    // Sorting the athletes, not the array: an index list ordered by
    // descending score carries each athlete's placement back to its
    // original slot, so the answer keeps the input's order.
    const order = score.map((_, i) => i).sort((a, b) => score[b] - score[a]);
    const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];
    const answer: string[] = new Array(score.length);
    order.forEach((i, place) => {
        answer[i] = place < 3 ? medals[place] : String(place + 1);
    });
    return answer;
}
