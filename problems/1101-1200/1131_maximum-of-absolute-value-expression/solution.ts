function maxAbsValExpr(arr1: number[], arr2: number[]): number {
    // |A|+|B|+|C| = max over sign triples of s1*A + s2*B + s3*C, so the best
    // pair distance is the widest span of one of 8 projections.
    let best = -Infinity;
    for (const s1 of [1, -1]) {
        for (const s2 of [1, -1]) {
            for (const s3 of [1, -1]) {
                let high = s1 * arr1[0] + s2 * arr2[0];
                let low = high;
                for (let k = 0; k < arr1.length; ++k) {
                    const value = s1 * arr1[k] + s2 * arr2[k] + s3 * k;
                    if (value > high) high = value;
                    else if (value < low) low = value;
                }
                best = Math.max(best, high - low);
            }
        }
    }
    return best;
}
