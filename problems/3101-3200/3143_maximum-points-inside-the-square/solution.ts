function maxPointsInsideSquare(points: number[][], s: string): number {
    // A square centred at the origin takes exactly the points whose
    // Chebyshev radius max(|x|, |y|) is within its half side, so valid
    // squares correspond to prefixes of the order sorted by radius -- an
    // entire equal-radius block sits inside or out as one. Sweep blocks
    // outward holding a global seen-tag table; a block that repeats a tag
    // inside itself or against earlier blocks is where every larger square
    // breaks, so the count gathered before it is optimal.
    const radius = (i: number): number => {
        const x = Math.abs(points[i][0]);
        const y = Math.abs(points[i][1]);
        return x > y ? x : y;
    };
    const order = Array.from({ length: points.length }, (_, i) => i);
    order.sort((a, b) => radius(a) - radius(b));
    const seen = new Array<boolean>(26).fill(false);
    let run = 0;
    let i = 0;
    while (i < order.length) {
        let j = i;
        while (j < order.length && radius(order[j]) === radius(order[i])) {
            ++j;
        }
        const block = new Array<boolean>(26).fill(false);
        let ok = true;
        for (let k = i; k < j; ++k) {
            const bit = s.charCodeAt(order[k]) - 97;
            if (seen[bit] || block[bit]) {
                ok = false;
                break;
            }
            block[bit] = true;
        }
        if (!ok) return run;
        for (let b = 0; b < 26; ++b) {
            if (block[b]) seen[b] = true;
        }
        run += j - i;
        i = j;
    }
    return run;
}
