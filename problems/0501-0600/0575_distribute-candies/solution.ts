function distributeCandies(candyType: number[]): number {
    // Two caps compete: Alice eats at most n / 2 candies, and there are
    // only as many types as distinct values. Each eaten candy can be a
    // new type until the types or the allowance runs out, so the answer
    // is the smaller of the distinct count and half the length.
    const types = new Set<number>(candyType);
    return Math.min(types.size, candyType.length / 2);
}
