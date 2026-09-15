function findGoodIntegers(n: number): number[] {
    // All values stay below 2 * 1000^3, well inside Number's exact range.
    let limit = 0;
    while ((limit + 1) ** 3 <= n) {
        limit++;
    }
    const cubes = Array.from({ length: limit + 1 }, (_, value) => value ** 3);
    const counts = new Map<number, number>();
    for (let a = 1; a <= limit; a++) {
        if (cubes[a] + cubes[a] > n) break;
        for (let b = a; b <= limit; b++) {
            const total = cubes[a] + cubes[b];
            if (total > n) break;
            counts.set(total, (counts.get(total) ?? 0) + 1);
        }
    }
    const result: number[] = [];
    for (const [total, count] of counts) {
        if (count >= 2) result.push(total);
    }
    result.sort((a, b) => a - b);
    return result;
}
