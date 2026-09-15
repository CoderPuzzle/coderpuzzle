// Blow every square up into a 3x3 block and paint its wall as blocked
// pixels along the block's diagonal: '/' fills the anti-diagonal, '\' the
// main diagonal, a blank fills nothing. Corner contacts survive the
// upscale because the diagonals of two blocks meeting at a corner leave
// the pixels beside them open, so the regions are just the connected
// components of open pixels — an explicit-stack flood fill counts them.
function regionsBySlashes(grid: string[]): number {
    const n = grid.length;
    const size = 3 * n;
    const blocked: boolean[] = new Array(size * size).fill(false);
    for (let i = 0; i < n; i += 1) {
        for (let j = 0; j < n; j += 1) {
            const ch = grid[i][j];
            if (ch === "/") {
                blocked[3 * i * size + 3 * j + 2] = true;
                blocked[(3 * i + 1) * size + 3 * j + 1] = true;
                blocked[(3 * i + 2) * size + 3 * j] = true;
            } else if (ch === "\\") {
                blocked[3 * i * size + 3 * j] = true;
                blocked[(3 * i + 1) * size + 3 * j + 1] = true;
                blocked[(3 * i + 2) * size + 3 * j + 2] = true;
            }
        }
    }
    // One flood fill per unvisited open pixel; each fill claims exactly one
    // region, so the number of fills is the answer.
    const seen: boolean[] = new Array(size * size).fill(false);
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    let regions = 0;
    for (let r = 0; r < size; r += 1) {
        for (let c = 0; c < size; c += 1) {
            if (blocked[r * size + c] || seen[r * size + c]) {
                continue;
            }
            regions += 1;
            seen[r * size + c] = true;
            const stack: number[] = [r * size + c];
            while (stack.length > 0) {
                const cell = stack.pop() as number;
                const cr = Math.floor(cell / size);
                const cc = cell % size;
                for (let d = 0; d < 4; d += 1) {
                    const nr = cr + dr[d];
                    const nc = cc + dc[d];
                    if (
                        nr >= 0 &&
                        nr < size &&
                        nc >= 0 &&
                        nc < size &&
                        !blocked[nr * size + nc] &&
                        !seen[nr * size + nc]
                    ) {
                        seen[nr * size + nc] = true;
                        stack.push(nr * size + nc);
                    }
                }
            }
        }
    }
    return regions;
}
