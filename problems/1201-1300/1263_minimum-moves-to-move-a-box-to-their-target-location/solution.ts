const DELTAS: [number, number][] = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
];

function minPushBox(grid: string[][]): number {
    const m = grid.length,
        n = grid[0].length;
    let box: [number, number] = [0, 0];
    let player: [number, number] = [0, 0];
    let target: [number, number] = [0, 0];
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            if (grid[r][c] === "B") box = [r, c];
            else if (grid[r][c] === "S") player = [r, c];
            else if (grid[r][c] === "T") target = [r, c];
        }
    }
    const free = (r: number, c: number): boolean => r >= 0 && r < m && c >= 0 && c < n && grid[r][c] !== "#";
    // Flood the player's reachable floor with the box as an obstacle.
    const reachable = (br: number, bc: number, sr: number, sc: number, seen: boolean[][]): void => {
        const queue: [number, number][] = [[sr, sc]];
        seen[sr][sc] = true;
        while (queue.length > 0) {
            const [r, c] = queue.shift()!;
            for (const [dr, dc] of DELTAS) {
                const nr = r + dr,
                    nc = c + dc;
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                if ((nr === br && nc === bc) || seen[nr][nc] || grid[nr][nc] === "#") continue;
                seen[nr][nc] = true;
                queue.push([nr, nc]);
            }
        }
    };

    // State: (box cell, side of the player). After a push along DELTAS[i]
    // the player ends up standing on side i of the new box cell. Each edge
    // is one push, so BFS yields minimal pushes.
    const visited = new Set<number>();
    const key = (br: number, bc: number, side: number): number => (br * n + bc) * 4 + side;
    const queue: [number, number, number, number][] = [];
    const around: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
    reachable(box[0], box[1], player[0], player[1], around);
    for (let i = 0; i < 4; ++i) {
        const standR = box[0] + DELTAS[i][0],
            standC = box[1] + DELTAS[i][1];
        const destR = box[0] - DELTAS[i][0],
            destC = box[1] - DELTAS[i][1];
        if (!free(standR, standC) || !free(destR, destC)) continue;
        if (!around[standR][standC]) continue;
        visited.add(key(destR, destC, i));
        queue.push([destR, destC, i, 1]);
    }
    while (queue.length > 0) {
        const [br, bc, side, pushes] = queue.shift()!;
        if (br === target[0] && bc === target[1]) return pushes;
        const seen: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
        reachable(br, bc, br + DELTAS[side][0], bc + DELTAS[side][1], seen);
        for (let i = 0; i < 4; ++i) {
            const standR = br + DELTAS[i][0],
                standC = bc + DELTAS[i][1];
            const destR = br - DELTAS[i][0],
                destC = bc - DELTAS[i][1];
            if (!free(standR, standC) || !free(destR, destC)) continue;
            if (!seen[standR][standC]) continue;
            const k = key(destR, destC, i);
            if (visited.has(k)) continue;
            visited.add(k);
            queue.push([destR, destC, i, pushes + 1]);
        }
    }
    return -1;
}
