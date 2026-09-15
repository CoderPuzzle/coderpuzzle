function countGoodRectangles(rectangles: number[][]): number {
    // Each rectangle independently caps a square at side min(l, w), so
    // the answer is the largest of those minima and how many rectangles
    // attain it: reset the count on a new maximum, increment it on a tie.
    let bestSide = 0;
    let count = 0;
    for (const [length, width] of rectangles) {
        const side = Math.min(length, width);
        if (side > bestSide) {
            bestSide = side;
            count = 1;
        } else if (side === bestSide) {
            count++;
        }
    }
    return count;
}
