function minimumSum(n: number, k: number): number {
    const below = Math.min(n, Math.floor(k / 2));
    const above = n - below;
    return (below * (below + 1)) / 2 + above * k + (above * (above - 1)) / 2;
}
