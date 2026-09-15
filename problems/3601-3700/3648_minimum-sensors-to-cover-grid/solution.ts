function minSensors(n: number, m: number, k: number): number {
    // A radius-k sensor covers an s x s square with s = 2 * k + 1, so tile
    // the grid: ceil(n / s) row strips times ceil(m / s) column strips, one
    // sensor per block.
    const side = 2 * k + 1;
    const rows = Math.floor((n + side - 1) / side);
    const cols = Math.floor((m + side - 1) / side);
    return rows * cols;
}
