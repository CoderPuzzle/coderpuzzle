/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findBall = function (grid) {
    // Each column's ball walks alone: the board d under it deflects it
    // into the gap between columns c and c + d, and it drops through only
    // if the board on the far side of that gap points the same way — a
    // facing pair forms a V that closes the gap, a missing neighbour means
    // the gap opens into a wall, and both mean stuck.
    const m = grid.length;
    const n = grid[0].length;
    const answer = new Array(n).fill(0);
    for (let ball = 0; ball < n; ball += 1) {
        let c = ball;
        for (let r = 0; r < m; r += 1) {
            const d = grid[r][c];
            const next = c + d;
            if (next < 0 || next >= n || grid[r][next] !== d) {
                c = -1;
                break;
            }
            c = next;
        }
        answer[ball] = c;
    }
    return answer;
};
