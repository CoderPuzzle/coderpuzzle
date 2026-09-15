type Region = {
    cells: number[][];
    // Distinct threatened 0-cells, encoded row * cols + col.
    frontier: Set<number>;
    walls: number;
};

// Walk one region with an explicit stack, collecting its cells, its
// frontier (distinct threatened 0-cells) and its wall count — one wall per
// region/0-cell shared edge.
function measure(grid: number[][], label: number[][], row: number, col: number, id: number): Region {
    const rows = grid.length;
    const cols = grid[0].length;
    const region: Region = { cells: [], frontier: new Set(), walls: 0 };
    label[row][col] = id;
    const stack: number[][] = [[row, col]];
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    while (stack.length > 0) {
        const cell = stack.pop() as number[];
        region.cells.push(cell);
        for (let d = 0; d < 4; ++d) {
            const r = cell[0] + dr[d];
            const c = cell[1] + dc[d];
            if (r < 0 || r >= rows || c < 0 || c >= cols) {
                continue;
            }
            if (grid[r][c] === 0) {
                region.frontier.add(r * cols + c);
                region.walls += 1;
            } else if (grid[r][c] === 1 && label[r][c] < 0) {
                label[r][c] = id;
                stack.push([r, c]);
            }
        }
    }
    return region;
}

function containVirus(isInfected: number[][]): number {
    // Nothing here is a choice: each day the region whose frontier (the
    // uninfected cells it would reach tonight) is largest gets walled, every
    // other region infects its frontier, and the answer just accumulates
    // the daily wall counts until no frontier is left.
    const rows = isInfected.length;
    const cols = isInfected[0].length;
    const grid = isInfected.map((row) => row.slice());
    let walls = 0;
    while (true) {
        const label: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-1));
        const regions: Region[] = [];
        for (let row = 0; row < rows; ++row) {
            for (let col = 0; col < cols; ++col) {
                if (grid[row][col] === 1 && label[row][col] < 0) {
                    regions.push(measure(grid, label, row, col, regions.length));
                }
            }
        }
        if (regions.length === 0) {
            return walls;
        }
        let best = 0;
        for (let i = 1; i < regions.length; ++i) {
            if (regions[i].frontier.size > regions[best].frontier.size) {
                best = i;
            }
        }
        // No region threatens anything: the outbreak is over, walled or
        // fully spread.
        if (regions[best].frontier.size === 0) {
            return walls;
        }
        walls += regions[best].walls;
        // 2 marks the quarantined region: inert, never spreading again and
        // never part of a later region.
        for (const [r, c] of regions[best].cells) {
            grid[r][c] = 2;
        }
        // The night: everyone else infects their frontier at once. A cell
        // the walled region had threatened still falls to an active region —
        // walls seal only the edges they stand on.
        for (let i = 0; i < regions.length; ++i) {
            if (i !== best) {
                for (const cell of regions[i].frontier) {
                    grid[Math.floor(cell / cols)][cell % cols] = 1;
                }
            }
        }
    }
}
