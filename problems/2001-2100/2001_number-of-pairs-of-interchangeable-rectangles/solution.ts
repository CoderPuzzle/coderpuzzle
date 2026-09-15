function interchangeableRectangles(rectangles: number[][]): number {
    let total = 0;
    const counts = new Map<number, number>();
    for (const [width, height] of rectangles) {
        const divisor = gcd(width, height);
        const key = (width / divisor) * 100001 + height / divisor;
        const previous = counts.get(key) ?? 0;
        total += previous;
        counts.set(key, previous + 1);
    }
    return total;
}

function gcd(a: number, b: number): number {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}
