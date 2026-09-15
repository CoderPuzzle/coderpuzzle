function missingMultiple(nums: number[], k: number): number {
    // The question is pure membership: drop every value into a hash set,
    // then walk the multiples of k upward until one is absent.
    const seen = new Set(nums);
    let candidate = k;
    while (seen.has(candidate)) {
        candidate += k;
    }
    return candidate;
}
