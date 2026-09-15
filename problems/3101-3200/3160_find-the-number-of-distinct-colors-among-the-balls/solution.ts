function queryResults(limit: number, queries: number[][]): number[] {
    // Two maps carry the whole state: ball -> its current color, and
    // color -> how many balls currently wear it. A query is a pair of
    // counter bumps around a map read, and the size of the live-color
    // map answers the query without ever rescanning the balls.
    const ballColor = new Map<number, number>();
    const colorCount = new Map<number, number>();
    const result: number[] = [];
    for (const [ball, color] of queries) {
        const previous = ballColor.get(ball);
        if (previous !== undefined) {
            const remaining = colorCount.get(previous)! - 1;
            // The old color vanishes only when its last ball left.
            if (remaining === 0) {
                colorCount.delete(previous);
            } else {
                colorCount.set(previous, remaining);
            }
        }
        colorCount.set(color, (colorCount.get(color) ?? 0) + 1);
        ballColor.set(ball, color);
        result.push(colorCount.size);
    }
    return result;
}
