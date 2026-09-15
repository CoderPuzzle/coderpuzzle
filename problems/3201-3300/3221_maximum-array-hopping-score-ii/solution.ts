// The optimal path always lands on the farthest index attaining the maximum
// of the remaining suffix: every element after the current position is at
// most that maximum, so routing through it trades each leg for at least as
// much value per unit of distance over the same ground, and equal maxima
// favor the later occurrence (same value, longer hop). The total stays under
// (n - 1) * 10^5 < 2^53, so plain numbers are exact.
function maxScore(nums: number[]): number {
    const n = nums.length;
    const farthest = new Array<number>(n);
    farthest[n - 1] = n - 1;
    for (let i = n - 2; i >= 0; i--) {
        farthest[i] = nums[i] > nums[farthest[i + 1]] ? i : farthest[i + 1];
    }
    let score = 0;
    let pos = 0;
    while (pos < n - 1) {
        const next = farthest[pos + 1];
        score += (next - pos) * nums[next];
        pos = next;
    }
    return score;
}
