function countPoints(points: number[][], queries: number[][]): number[] {
    // A point lies in the circle exactly when its squared euclidean
    // distance to the center is at most r*r. Squaring keeps everything
    // in integers (values stay below 2*500*500), so border points are
    // judged exactly where sqrt rounding could misclassify them.
    const answer: number[] = [];
    for (const [xj, yj, rj] of queries) {
        const rr = rj * rj;
        let count = 0;
        for (const [x, y] of points) {
            const dx = x - xj;
            const dy = y - yj;
            if (dx * dx + dy * dy <= rr) count++;
        }
        answer.push(count);
    }
    return answer;
}
