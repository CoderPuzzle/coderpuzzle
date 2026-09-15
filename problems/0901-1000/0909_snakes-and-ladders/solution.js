/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function (board) {
    // The game is an unweighted shortest-path search: squares are nodes
    // and dice rolls are edges of cost 1, so BFS from square 1 finds the
    // fewest moves. Flatten the board with the boustrophedon walk (bottom
    // row left to right, next row right to left, flipping each row up);
    // a roll landing on square s resolves to cells[s] when that entry is
    // not -1 and to s otherwise — exactly one mandatory teleport, never
    // chained, since the landing square is enqueued as an ordinary node.
    // Each node expands to the at-most-six destinations in
    // [curr + 1, min(curr + 6, n * n)], and an empty level means n * n
    // is unreachable.
    const n = board.length;
    const target = n * n;
    const cells = new Array(target + 1).fill(-1);
    let square = 1;
    for (let rowFromBottom = 0; rowFromBottom < n; rowFromBottom++) {
        const row = board[n - 1 - rowFromBottom];
        for (let column = 0; column < n; column++) {
            cells[square] = rowFromBottom % 2 === 0 ? row[column] : row[n - 1 - column];
            square++;
        }
    }
    const visited = new Array(target + 1).fill(false);
    visited[1] = true;
    let current = [1];
    let moves = 0;
    while (current.length > 0) {
        moves++;
        const reachable = [];
        for (const curr of current) {
            const furthest = Math.min(curr + 6, target);
            for (let next = curr + 1; next <= furthest; next++) {
                const destination = cells[next] !== -1 ? cells[next] : next;
                if (destination === target) {
                    return moves;
                }
                if (!visited[destination]) {
                    visited[destination] = true;
                    reachable.push(destination);
                }
            }
        }
        current = reachable;
    }
    return -1;
};
