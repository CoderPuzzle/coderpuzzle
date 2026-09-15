function containsDuplicate(nums: number[]): boolean {
    // One pass with a set of already-visited values.
    const seen = new Set<number>();
    for (const value of nums) {
        // Check before inserting so the first copy is never a false hit.
        if (seen.has(value)) {
            return true;
        }
        seen.add(value);
    }
    // Loop finished: every element was distinct at insertion time.
    return false;
}
