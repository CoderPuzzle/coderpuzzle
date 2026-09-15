// The border acts as a wall, so leaving the grid ends the roll just like a
// 1 cell does.
function roll(maze: number[][], row: number, col: number, dr: number, dc: number): number[] {
    while (true) {
        const nextRow = row + dr;
        const nextCol = col + dc;
        if (nextRow < 0 || nextRow >= maze.length || nextCol < 0 || nextCol >= maze[0].length) {
            break;
        }
        if (maze[nextRow][nextCol] === 1) {
            break;
        }
        row = nextRow;
        col = nextCol;
    }
    return [row, col];
}

function hasPath(maze: number[][], start: number[], destination: number[]): boolean {
    // The ball begins at rest, so the start cell is itself a stopping
    // position and seeds the queue.
    const queue: number[][] = [[start[0], start[1]]];
    const stopped: boolean[][] = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));
    stopped[start[0]][start[1]] = true;
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    for (let head = 0; head < queue.length; ++head) {
        const row = queue[head][0];
        const col = queue[head][1];
        if (row === destination[0] && col === destination[1]) {
            return true;
        }
        // A roll is deterministic, so each stop has at most four
        // successors — the rest cells of its four rolls — and every
        // one of them is scheduled exactly once.
        for (let d = 0; d < 4; ++d) {
            const rest = roll(maze, row, col, dr[d], dc[d]);
            if (!stopped[rest[0]][rest[1]]) {
                stopped[rest[0]][rest[1]] = true;
                queue.push(rest);
            }
        }
    }
    return false;
}
