function majorityElement(nums: number[]): number {
    // Boyer-Moore voting: the majority outnumbers all others combined, so
    // pairing each of its votes against one opposing vote still leaves a
    // survivor — no explicit counting needed.
    let candidate = 0;
    let count = 0;
    let hasCandidate = false;
    for (const num of nums) {
        if (count === 0) {
            // Zero count means a self-cancelling segment just ended;
            // adopt the current element afresh.
            candidate = num;
            count = 1;
            hasCandidate = true;
        } else if (num === candidate) {
            count += 1;
        } else {
            // A differing element cancels one candidate vote.
            count -= 1;
        }
    }
    // A majority is guaranteed to exist, so the standing candidate is it.
    return hasCandidate ? candidate : 0;
}
