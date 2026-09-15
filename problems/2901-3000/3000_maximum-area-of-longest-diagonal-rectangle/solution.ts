function areaOfMaxDiagonal(dimensions: number[][]): number {
    // Compare diagonals through their squares (l^2 + w^2): squares order
    // diagonals identically and stay exact in integers, so no square
    // roots or float rounding anywhere. Ties on the diagonal fall
    // through to the larger area.
    let bestDiag = 0;
    let bestArea = 0;
    for (const [length, width] of dimensions) {
        const diag = length * length + width * width;
        const area = length * width;
        if (diag > bestDiag || (diag === bestDiag && area > bestArea)) {
            bestDiag = diag;
            bestArea = area;
        }
    }
    return bestArea;
}
