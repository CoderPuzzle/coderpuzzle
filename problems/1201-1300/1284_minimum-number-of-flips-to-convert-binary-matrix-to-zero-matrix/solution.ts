function minFlips(mat: number[][]): number {
    // Pack the matrix into one integer; flipping cell i XORs the state with
    // its cross-shaped flip mask. Order never matters and flipping a cell
    // twice cancels, so the reachable states form one graph per start state
    // and BFS over it gives the minimum step count.
    const m = mat.length;
    const n = mat[0].length;
    let start = 0;
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (mat[r][c] === 1) {
                start |= 1 << (r * n + c);
            }
        }
    }
    if (start === 0) {
        return 0;
    }
    const masks: number[] = [];
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            let mask = 1 << (r * n + c);
            for (const [dr, dc] of [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1],
            ]) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    mask |= 1 << (nr * n + nc);
                }
            }
            masks.push(mask);
        }
    }
    const seen = new Uint8Array(1 << (m * n));
    let frontier: number[] = [start];
    seen[start] = 1;
    let steps = 0;
    while (frontier.length > 0) {
        steps++;
        const next: number[] = [];
        for (const state of frontier) {
            for (const mask of masks) {
                const nstate = state ^ mask;
                if (nstate === 0) {
                    return steps;
                }
                if (!seen[nstate]) {
                    seen[nstate] = 1;
                    next.push(nstate);
                }
            }
        }
        frontier = next;
    }
    return -1;
}
