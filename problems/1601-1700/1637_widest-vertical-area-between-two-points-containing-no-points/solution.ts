function maxWidthOfVerticalArea(points: number[][]): number {
    const xs = points.map((point) => point[0]).sort((a, b) => a - b);

    let widest = 0;
    for (let i = 1; i < xs.length; i++) {
        widest = Math.max(widest, xs[i] - xs[i - 1]);
    }
    return widest;
}
