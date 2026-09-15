function queensAttacktheKing(queens: number[][], king: number[]): number[][] {
    const board: boolean[][] = Array.from({ length: 8 }, () => new Array(8).fill(false));
    for (const [x, y] of queens) board[x][y] = true;
    const out: number[][] = [];
    for (let dx = -1; dx <= 1; ++dx) {
        for (let dy = -1; dy <= 1; ++dy) {
            if (dx === 0 && dy === 0) continue;
            // First queen on each ray attacks; she also blocks the rest.
            let x = king[0] + dx;
            let y = king[1] + dy;
            while (x >= 0 && x < 8 && y >= 0 && y < 8) {
                if (board[x][y]) {
                    out.push([x, y]);
                    break;
                }
                x += dx;
                y += dy;
            }
        }
    }
    return out;
}
