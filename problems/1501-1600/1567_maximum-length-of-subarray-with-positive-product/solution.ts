function getMaxLen(nums: number[]): number {
    // `posLen` / `negLen` are the lengths of the longest subarrays ending at
    // the current index whose product is positive / negative. A zero breaks
    // any run, so both reset to 0. A positive value keeps every sign as-is:
    // `posLen` always extends, `negLen` only extends if there already was a
    // negative-ending run. A negative value flips every sign, so the two
    // lengths swap roles (each extended by one) before moving on: what used
    // to end negative now ends positive, and what used to end positive now
    // ends negative.
    let posLen = 0;
    let negLen = 0;
    let maxLen = 0;
    for (const x of nums) {
        if (x === 0) {
            posLen = 0;
            negLen = 0;
        } else if (x > 0) {
            posLen++;
            negLen = negLen > 0 ? negLen + 1 : 0;
        } else {
            const newPosLen = negLen > 0 ? negLen + 1 : 0;
            const newNegLen = posLen + 1;
            posLen = newPosLen;
            negLen = newNegLen;
        }
        maxLen = Math.max(maxLen, posLen);
    }
    return maxLen;
}
