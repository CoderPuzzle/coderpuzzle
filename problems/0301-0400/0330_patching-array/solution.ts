function minPatches(nums: number[], n: number): number {
    let patches = 0;
    let i = 0;
    // Invariant: every sum in [1, reachable) is formable; reachable
    // itself is the smallest sum that is not.
    let reachable = 1;
    while (reachable <= n) {
        // Consume nums[i] while it fits inside the covered range: it
        // extends coverage to [1, reachable + nums[i]) at no patch cost.
        if (i < nums.length && nums[i] <= reachable) {
            reachable += nums[i];
            i++;
        } else {
            // Genuine gap: patch reachable itself (any smaller patch
            // covers less, any larger leaves the gap) and double.
            reachable += reachable;
            patches++;
        }
    }
    return patches;
}
