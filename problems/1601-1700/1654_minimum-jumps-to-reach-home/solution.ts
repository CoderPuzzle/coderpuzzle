// Treat the line as a graph whose nodes are (position, back) pairs, back
// marking that the previous jump went backward — the state that forbids
// a second consecutive backward jump. Breadth-first search by jump count
// reaches home in the fewest jumps; the line only needs to be explored
// up to max(x, max(forbidden)) + a + b, because above that line there is
// nothing to land on that matters, and each backward jump must be paid
// for by a following forward jump, so a useful overshoot tops out one
// forward step plus one backward reach higher.
function minimumJumps(forbidden: number[], a: number, b: number, x: number): number {
    let highest = x;
    for (const position of forbidden) {
        highest = Math.max(highest, position);
    }
    const limit = highest + a + b;
    const blocked: boolean[] = new Array(limit + 1).fill(false);
    for (const position of forbidden) {
        blocked[position] = true;
    }
    // seen[position][back] — back == 1 means the previous jump was backward
    const seen: boolean[][] = Array.from({ length: limit + 1 }, () => [false, false]);
    seen[0][0] = true;
    let frontier: [number, number][] = [[0, 0]];
    let jumps = 0;
    while (frontier.length > 0) {
        const next: [number, number][] = [];
        for (const [position, back] of frontier) {
            if (position === x) {
                return jumps;
            }
            const forward = position + a;
            if (forward <= limit && !blocked[forward] && !seen[forward][0]) {
                seen[forward][0] = true;
                next.push([forward, 0]);
            }
            if (back === 0) {
                const backward = position - b;
                if (backward >= 0 && !blocked[backward] && !seen[backward][1]) {
                    seen[backward][1] = true;
                    next.push([backward, 1]);
                }
            }
        }
        frontier = next;
        jumps++;
    }
    return -1;
}
