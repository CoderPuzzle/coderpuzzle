// Only the array's total matters: one added element moves the sum by at
// most +/-limit, so closing a gap g takes ceil(g / limit). The gap stays
// below 1.1e11 — far under 2^53 — so plain numbers hold every value
// exactly, and gap/limit cannot round across an integer boundary
// because gap < 2^53 makes the rounding error smaller than 1/limit.
function minElements(nums: number[], limit: number, goal: number): number {
    let sum = 0;
    for (const x of nums) sum += x;
    const gap = Math.abs(goal - sum);
    return Math.ceil(gap / limit);
}
