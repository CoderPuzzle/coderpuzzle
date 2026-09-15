function arrayRankTransform(arr: number[]): number[] {
    // Rank = position in the sorted distinct values, 1-based; the map is then
    // applied in input order so the output preserves positions.
    const distinct = Array.from(new Set(arr)).sort((a, b) => a - b);
    const ranks = new Map<number, number>();
    distinct.forEach((value, index) => ranks.set(value, index + 1));
    return arr.map((value) => ranks.get(value)!);
}
