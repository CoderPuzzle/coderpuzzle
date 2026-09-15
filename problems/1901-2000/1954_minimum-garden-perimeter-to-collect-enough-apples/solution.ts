function minimumPerimeter(neededApples: number): number {
    // A square plot with half-side k covers the integer coordinates [-k,k]^2.
    // Summing |i| + |j| over that box gives apples(k) = 2k(k+1)(2k+1); the
    // answer is 8k for the smallest k with apples(k) >= neededApples.
    // neededApples <= 10^15 < 2^53 and the search's largest intermediate
    // apples(65536) ~ 1.13e15 < 2^53, so plain Number is exact throughout.
    const apples = (k: number): number => 2 * k * (k + 1) * (2 * k + 1);
    let hi = 1;
    while (apples(hi) < neededApples) hi *= 2;
    let lo = 1;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (apples(mid) >= neededApples) hi = mid;
        else lo = mid + 1;
    }
    return 8 * lo;
}
