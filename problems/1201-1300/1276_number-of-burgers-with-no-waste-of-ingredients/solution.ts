function numOfBurgers(tomatoSlices: number, cheeseSlices: number): number[] {
    // Solve the system: 4J + 2S = tomatoes, J + S = cheese. Doubling the
    // cheese equation and subtracting isolates jumbo:
    // 2J = tomatoes - 2*cheese. The pair exists iff that value is a
    // non-negative even integer and the back-solved small count is
    // non-negative too.
    const twoJumbo = tomatoSlices - 2 * cheeseSlices;
    if (twoJumbo < 0 || twoJumbo % 2 !== 0) {
        return [];
    }
    const jumbo = twoJumbo / 2;
    const small = cheeseSlices - jumbo;
    if (small < 0) {
        return [];
    }
    return [jumbo, small];
}
