function construct(grid: number[][]): QuadNode | null {
    const build = (r0: number, c0: number, size: number): QuadNode => {
        const first = grid[r0][c0];
        let uniform = true;
        scan: for (let r = r0; r < r0 + size; ++r) {
            for (let c = c0; c < c0 + size; ++c) {
                if (grid[r][c] !== first) {
                    uniform = false;
                    break scan;
                }
            }
        }
        if (uniform) return new QuadNode(first === 1, true);
        const half = size / 2;
        const node = new QuadNode(false, false);
        node.topLeft = build(r0, c0, half);
        node.topRight = build(r0, c0 + half, half);
        node.bottomLeft = build(r0 + half, c0, half);
        node.bottomRight = build(r0 + half, c0 + half, half);
        return node;
    };
    return build(0, 0, grid.length);
}
