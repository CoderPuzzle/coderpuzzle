function isRobotBounded(instructions: string): boolean {
    // simulate one pass from the origin facing north; L/R rotate the
    // heading a quarter turn via (dx, dy) -> (-dy, dx) / (dy, -dx)
    let x = 0,
        y = 0;
    let dx = 0,
        dy = 1; // north
    for (const ch of instructions) {
        if (ch === "G") {
            x += dx;
            y += dy;
        } else if (ch === "L") {
            const ndx = -dy,
                ndy = dx;
            dx = ndx;
            dy = ndy;
        } else {
            // 'R'
            const ndx = dy,
                ndy = -dx;
            dx = ndx;
            dy = ndy;
        }
    }
    // at the origin: each pass is a closed loop. Turned at all: every
    // repetition's displacement is the previous one rotated by a fixed
    // quarter turn, so at most four copies cancel back to the start.
    // Facing north while displaced repeats the same drift — the one
    // unbounded case.
    return (x === 0 && y === 0) || !(dx === 0 && dy === 1);
}
