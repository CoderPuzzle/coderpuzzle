function searchMatrix(matrix: number[][], target: number): boolean {
    // Both guarantees together make row-major reading order one sorted
    // sequence, so a single bisection over the flattened index space
    // honors the O(log(m * n)) requirement.
    const m = matrix.length;
    const n = matrix[0].length;
    let lo = 0;
    let hi = m * n;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (matrix[Math.floor(mid / n)][mid % n] < target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    // lo is the first flattened index holding a value >= target: the hit
    // itself when present, or the smallest value past it when absent.
    return lo < m * n && matrix[Math.floor(lo / n)][lo % n] === target;
}
