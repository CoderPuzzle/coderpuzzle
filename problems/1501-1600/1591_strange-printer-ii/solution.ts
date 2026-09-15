function isPrintable(targetGrid: number[][]): boolean {
    const rows = targetGrid.length,
        cols = targetGrid[0].length;

    // Each color's bounding rectangle: the smallest axis-aligned box that
    // covers every cell holding that color in the target grid.
    const minRow = new Map<number, number>();
    const maxRow = new Map<number, number>();
    const minCol = new Map<number, number>();
    const maxCol = new Map<number, number>();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const color = targetGrid[r][c];
            if (!minRow.has(color)) {
                minRow.set(color, r);
                maxRow.set(color, r);
                minCol.set(color, c);
                maxCol.set(color, c);
            } else {
                if (r < minRow.get(color)!) minRow.set(color, r);
                if (r > maxRow.get(color)!) maxRow.set(color, r);
                if (c < minCol.get(color)!) minCol.set(color, c);
                if (c > maxCol.get(color)!) maxCol.set(color, c);
            }
        }
    }

    // An edge color -> other means color's bounding box shows `other`
    // somewhere inside it, so color must be stamped before `other`.
    const colors = Array.from(minRow.keys());
    const adjacency = new Map<number, Set<number>>();
    for (const color of colors) adjacency.set(color, new Set());
    for (const color of colors) {
        const neighbors = adjacency.get(color)!;
        for (let r = minRow.get(color)!; r <= maxRow.get(color)!; r++) {
            for (let c = minCol.get(color)!; c <= maxCol.get(color)!; c++) {
                const other = targetGrid[r][c];
                if (other !== color) neighbors.add(other);
            }
        }
    }

    // A valid stamp order exists iff this dependency graph has no cycle.
    const WHITE = 0,
        GRAY = 1,
        BLACK = 2;
    const state = new Map<number, number>();
    for (const color of colors) state.set(color, WHITE);

    const hasCycle = (node: number): boolean => {
        state.set(node, GRAY);
        for (const neighbor of adjacency.get(node)!) {
            const neighborState = state.get(neighbor);
            if (neighborState === GRAY) return true;
            if (neighborState === WHITE && hasCycle(neighbor)) return true;
        }
        state.set(node, BLACK);
        return false;
    };

    for (const color of colors) {
        if (state.get(color) === WHITE && hasCycle(color)) return false;
    }
    return true;
}
