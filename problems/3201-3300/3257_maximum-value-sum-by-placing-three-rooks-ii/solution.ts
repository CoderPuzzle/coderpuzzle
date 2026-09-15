// The three rooks occupy three distinct rows; pick the middle row i.
// top[i][j] is the best cell in column j above row i and bottom[i][j] the
// best below. A placement takes one column from the top band, one from row
// i, one from the bottom band, all distinct — and only each band's three
// best columns can matter, so 27 combinations per middle row are exact.
// Sums reach 3 * 10^9, far below Number's exact 2^53 limit.
function maximumValueSum(board: number[][]): number {
    const m = board.length;
    const n = board[0].length;
    const top: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    const bottom: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    for (let j = 0; j < n; j++) {
        top[0][j] = board[0][j];
        for (let i = 1; i < m; i++) {
            top[i][j] = Math.max(top[i - 1][j], board[i][j]);
        }
        bottom[m - 1][j] = board[m - 1][j];
        for (let i = m - 2; i >= 0; i--) {
            bottom[i][j] = Math.max(bottom[i + 1][j], board[i][j]);
        }
    }
    const pick = (vals: number[]): number[] => {
        const idx = Array.from({ length: n }, (_, c) => c);
        idx.sort((a, b) => vals[b] - vals[a]);
        return [idx[0], idx[1], idx[2]];
    };
    let ans = -Infinity;
    for (let i = 1; i < m - 1; i++) {
        const t = pick(top[i - 1]);
        const mid = pick(board[i]);
        const b = pick(bottom[i + 1]);
        for (const ca of t) {
            for (const cb of mid) {
                if (cb === ca) {
                    continue;
                }
                for (const cc of b) {
                    if (cc === ca || cc === cb) {
                        continue;
                    }
                    ans = Math.max(ans, top[i - 1][ca] + board[i][cb] + bottom[i + 1][cc]);
                }
            }
        }
    }
    return ans;
}
