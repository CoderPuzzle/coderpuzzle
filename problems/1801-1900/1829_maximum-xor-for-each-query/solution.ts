function getMaximumXor(nums: number[], maximumBit: number): number[] {
    // Every value sits below 2^maximumBit, so the running XOR does too,
    // and XOR with a fixed prefix is a bijection on that range: the
    // maximum of prefix ^ k is reached exactly at k = mask ^ prefix,
    // where mask = 2^maximumBit - 1. Removing the last element just
    // XORs it back out of the running total, so one backward walk
    // answers every prefix without recomputing anything.
    const mask = (1 << maximumBit) - 1;
    let running = 0;
    for (const value of nums) running ^= value;
    const answer: number[] = [];
    for (let i = nums.length - 1; i >= 0; i--) {
        answer.push(running ^ mask);
        running ^= nums[i];
    }
    return answer;
}
