function slidingPuzzle(board: number[][]): number {
    const target = "123450";
    // Adjacency of each row-major cell on the 2x3 board, so the
    // expansion needs no bounds logic.
    const neighbors = [
        [1, 3],
        [0, 2, 4],
        [1, 5],
        [0, 4],
        [3, 5, 1],
        [2, 4],
    ];
    // Boards are nodes, slides of the 0 are edges: BFS gives the
    // minimum move count over at most 6! = 720 states, encoded as
    // strings so they hash into a visited set.
    const start = board[0].concat(board[1]).join("");
    if (start === target) return 0;
    const visited = new Set<string>([start]);
    const queue: [string, number][] = [[start, 0]];
    while (queue.length > 0) {
        const [state, moves] = queue.shift()!;
        const zero = state.indexOf("0");
        for (const nxt of neighbors[zero]) {
            // Swap the 0 with a neighboring tile to make a successor.
            const chars = state.split("");
            const tmp = chars[zero];
            chars[zero] = chars[nxt];
            chars[nxt] = tmp;
            const newState = chars.join("");
            if (newState === target) return moves + 1;
            // Enqueue only unvisited states so each expands once.
            if (!visited.has(newState)) {
                visited.add(newState);
                queue.push([newState, moves + 1]);
            }
        }
    }
    // Queue exhausted: the target sits in the unreachable half of the
    // permutations (odd parity).
    return -1;
}
