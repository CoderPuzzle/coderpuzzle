function unhappyFriends(n: number, preferences: number[][], pairs: number[][]): number {
    // rank[i][j] = how highly friend i ranks friend j (lower = more preferred).
    const rank: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let position = 0; position < preferences[i].length; position++) {
            rank[i][preferences[i][position]] = position;
        }
    }

    const partner: number[] = new Array(n).fill(0);
    for (const [x, y] of pairs) {
        partner[x] = y;
        partner[y] = x;
    }

    let unhappy = 0;
    for (let x = 0; x < n; x++) {
        const y = partner[x];
        for (let u = 0; u < n; u++) {
            if (u === x || u === y) {
                continue;
            }
            const v = partner[u];
            if (rank[x][u] < rank[x][y] && rank[u][x] < rank[u][v]) {
                unhappy++;
                break;
            }
        }
    }
    return unhappy;
}
