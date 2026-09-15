function tourOfKnight(m: number, n: number, r: number, c: number): number[][] {
    const moves: [number, number][] = [
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
        [-2, 1],
        [-1, 2],
    ];
    const board: number[][] = Array.from({ length: m }, () => Array(n).fill(-1));
    board[r][c] = 0;
    const onward = (row: number, col: number): number => {
        let count = 0;
        for (const [dr, dc] of moves) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] === -1) {
                count++;
            }
        }
        return count;
    };
    const walk = (row: number, col: number, order: number): boolean => {
        if (order === m * n) {
            return true;
        }
        const choices: [number, number, number][] = [];
        for (const [dr, dc] of moves) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] === -1) {
                choices.push([onward(nr, nc), nr, nc]);
            }
        }
        choices.sort((a, b) => a[0] - b[0]);
        for (const [, nr, nc] of choices) {
            board[nr][nc] = order;
            if (walk(nr, nc, order + 1)) {
                return true;
            }
            board[nr][nc] = -1;
        }
        return false;
    };
    walk(r, c, 1);
    return board;
}
