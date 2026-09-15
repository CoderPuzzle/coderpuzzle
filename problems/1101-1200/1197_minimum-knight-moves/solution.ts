function minKnightMoves(x: number, y: number): number {
    // Mirror symmetry folds every target into the first quadrant; a knight
    // never needs to leave the window two squares past it.
    const tx = Math.abs(x);
    const ty = Math.abs(y);
    const moves = [
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
        [-2, 1],
        [-1, 2],
    ];
    const seen = new Set<string>();
    seen.add("2,2");
    let queue: Array<[number, number]> = [[0, 0]];
    let steps = 0;
    while (queue.length > 0) {
        const next: Array<[number, number]> = [];
        for (const [cx, cy] of queue) {
            if (cx === tx && cy === ty) {
                return steps;
            }
            for (const [dx, dy] of moves) {
                const nx = cx + dx;
                const ny = cy + dy;
                if (-2 <= nx && nx <= tx + 2 && -2 <= ny && ny <= ty + 2) {
                    const key = `${nx + 2},${ny + 2}`;
                    if (!seen.has(key)) {
                        seen.add(key);
                        next.push([nx, ny]);
                    }
                }
            }
        }
        queue = next;
        steps++;
    }
    throw new Error("unreachable");
}
