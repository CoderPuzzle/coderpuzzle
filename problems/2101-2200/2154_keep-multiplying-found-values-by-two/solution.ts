// One O(1) set lookup per doubling step replaces a fresh scan of nums
// each time; values stay <= 2048 (double the 1000 cap), far below
// Number's 2^53 ceiling, so arithmetic stays exact.
function findFinalValue(nums: number[], original: number): number {
    const seen = new Set(nums);
    while (seen.has(original)) {
        original *= 2;
    }
    return original;
}
