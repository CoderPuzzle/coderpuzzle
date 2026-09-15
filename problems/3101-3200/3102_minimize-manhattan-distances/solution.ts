function minimumDistance(points: number[][]): number {
    const n = points.length;
    // Rotated coordinates u = x + y, v = x - y turn Manhattan distance
    // into max(|du|, |dv|); each axis then only needs its extremes.
    const u: number[] = new Array(n);
    const v: number[] = new Array(n);
    for (let i = 0; i < n; i++) {
        u[i] = points[i][0] + points[i][1];
        v[i] = points[i][0] - points[i][1];
    }
    const orderU = [...Array(n).keys()].sort((a, b) => u[a] - u[b]);
    const orderV = [...Array(n).keys()].sort((a, b) => v[a] - v[b]);
    let best = Infinity;
    for (let removed = 0; removed < n; removed++) {
        const loU = orderU[0] === removed ? orderU[1] : orderU[0];
        const hiU = orderU[n - 1] === removed ? orderU[n - 2] : orderU[n - 1];
        const loV = orderV[0] === removed ? orderV[1] : orderV[0];
        const hiV = orderV[n - 1] === removed ? orderV[n - 2] : orderV[n - 1];
        best = Math.min(best, Math.max(u[hiU] - u[loU], v[hiV] - v[loV]));
    }
    return best;
}
