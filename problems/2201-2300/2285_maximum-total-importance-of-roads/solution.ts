function maximumImportance(n: number, roads: number[][]): number {
    const degrees = new Array<number>(n).fill(0);
    for (const [a, b] of roads) {
        degrees[a]++;
        degrees[b]++;
    }
    degrees.sort((x, y) => x - y);
    let total = 0;
    for (let rank = 1; rank <= n; rank++) {
        total += rank * degrees[rank - 1];
    }
    return total;
}
