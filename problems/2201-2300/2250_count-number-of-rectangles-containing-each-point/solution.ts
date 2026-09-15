function countRectangles(rectangles: number[][], points: number[][]): number[] {
    const byHeight: number[][] = Array.from({ length: 101 }, () => []);
    for (const [l, h] of rectangles) {
        byHeight[h].push(l);
    }
    for (const lengths of byHeight) {
        lengths.sort((a, b) => a - b);
    }

    const countAtLeast = (lengths: number[], x: number): number => {
        let lo = 0,
            hi = lengths.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (lengths[mid] >= x) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lengths.length - lo;
    };

    return points.map(([x, y]) => {
        let total = 0;
        for (let h = y; h <= 100; h++) {
            total += countAtLeast(byHeight[h], x);
        }
        return total;
    });
}
