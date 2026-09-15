function robotSim(commands: number[], obstacles: number[][]): number {
    // Replay the walk exactly as stated: the heading is an index on the
    // four cardinal directions, a turn is one step around that cycle
    // (right +1, left +3, mod 4), and a forward command is unit moves
    // that halt the whole command the moment the next cell is blocked.
    // Obstacles live in a set for constant-time membership, and the
    // answer is the largest x*x + y*y over the whole path in time, not
    // just at the final cell.
    // One integer key per cell; 200003 exceeds twice the furthest
    // reachable coordinate (9 * 10^4), so distinct cells never collide.
    const blocked = new Set(obstacles.map(([x, y]) => x * 200003 + y));
    const dx = [0, 1, 0, -1]; // north, east, south, west
    const dy = [1, 0, -1, 0];
    let x = 0;
    let y = 0;
    let heading = 0;
    let best = 0;
    for (const command of commands) {
        if (command === -2) {
            heading = (heading + 3) % 4; // turn left
        } else if (command === -1) {
            heading = (heading + 1) % 4; // turn right
        } else {
            for (let step = 0; step < command; step++) {
                const nx = x + dx[heading];
                const ny = y + dy[heading];
                if (blocked.has(nx * 200003 + ny)) {
                    break;
                }
                x = nx;
                y = ny;
                best = Math.max(best, x * x + y * y);
            }
        }
    }
    return best;
}
