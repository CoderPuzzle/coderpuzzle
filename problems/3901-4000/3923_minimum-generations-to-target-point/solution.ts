function minGenerations(points: number[][], target: number[]): number {
    const size = 7;
    const index = (x: number, y: number, z: number) => x * size * size + y * size + z;
    const INF = 1e9;
    const best = new Array<number>(size * size * size).fill(INF);
    for (const [x, y, z] of points) best[index(x, y, z)] = 0;

    let changed = true;
    while (changed) {
        changed = false;
        for (let a = 0; a < size * size * size; a++) {
            if (best[a] === INF) continue;
            const ax = Math.floor(a / (size * size));
            const ay = Math.floor(a / size) % size;
            const az = a % size;
            for (let b = a + 1; b < size * size * size; b++) {
                if (best[b] === INF) continue;
                const bx = Math.floor(b / (size * size));
                const by = Math.floor(b / size) % size;
                const bz = b % size;
                const nx = Math.floor((ax + bx) / 2);
                const ny = Math.floor((ay + by) / 2);
                const nz = Math.floor((az + bz) / 2);
                const next = index(nx, ny, nz);
                const candidate = Math.max(best[a], best[b]) + 1;
                if (candidate < best[next]) {
                    best[next] = candidate;
                    changed = true;
                }
            }
        }
    }

    const answer = best[index(target[0], target[1], target[2])];
    return answer === INF ? -1 : answer;
}
