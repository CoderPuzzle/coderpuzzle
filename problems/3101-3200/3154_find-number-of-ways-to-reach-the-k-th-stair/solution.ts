function waysToReachStair(k: number): number {
    // With x up-ops the top height is 2^x, so ending on stair k takes
    // y = 2^x - k down-ops; they must sit in distinct gaps among the
    // x + 1 slots around the ups, giving C(x + 1, y) orderings. The
    // running product stays far below 2^53, so doubles divide exactly.
    let total = 0;
    for (let ups = 0; ; ups++) {
        const downs = Math.pow(2, ups) - k;
        if (downs > ups + 1) {
            break;
        }
        if (downs >= 0) {
            let ways = 1;
            for (let i = 0; i < downs; i++) {
                ways = (ways * (ups + 1 - i)) / (i + 1);
            }
            total += ways;
        }
    }
    return total;
}
