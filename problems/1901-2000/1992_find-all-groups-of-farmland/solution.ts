function findFarmland(land: number[][]): number[][] {
    // Iterative BFS per unvisited farmland cell: flood the component and track
    // the min/max row and column, which for a rectangular group is exactly its
    // top-left and bottom-right corner.
    const m = land.length;
    const n = land[0].length;
    const seen = Array.from({ length: m }, () => new Array(n).fill(false));
    const groups: number[][] = [];
    const dr = [1, -1, 0, 0];
    const dc = [0, 0, 1, -1];
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            if (land[r][c] !== 1 || seen[r][c]) continue;
            seen[r][c] = true;
            const q: number[][] = [[r, c]];
            let minR = r,
                maxR = r,
                minC = c,
                maxC = c;
            while (q.length > 0) {
                const [cr, cc] = q.shift()!;
                minR = Math.min(minR, cr);
                maxR = Math.max(maxR, cr);
                minC = Math.min(minC, cc);
                maxC = Math.max(maxC, cc);
                for (let d = 0; d < 4; ++d) {
                    const nr = cr + dr[d];
                    const nc = cc + dc[d];
                    if (0 <= nr && nr < m && 0 <= nc && nc < n && land[nr][nc] === 1 && !seen[nr][nc]) {
                        seen[nr][nc] = true;
                        q.push([nr, nc]);
                    }
                }
            }
            groups.push([minR, minC, maxR, maxC]);
        }
    }
    return groups;
}
