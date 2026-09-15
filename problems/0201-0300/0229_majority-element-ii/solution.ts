function majorityElement(nums: number[]): number[] {
    // Extended Boyer-Moore voting: two candidate slots, two counters. A match
    // raises its slot's counter, a zero counter adopts the current value, and
    // a value matching neither slot spends both counters.
    let candidate1 = 0;
    let count1 = 0;
    let candidate2 = 0;
    let count2 = 0;
    for (const value of nums) {
        if (value === candidate1) {
            count1 += 1;
        } else if (value === candidate2) {
            count2 += 1;
        } else if (count1 === 0) {
            candidate1 = value;
            count1 = 1;
        } else if (count2 === 0) {
            candidate2 = value;
            count2 = 1;
        } else {
            count1 -= 1;
            count2 -= 1;
        }
    }
    // The vote only nominates; a verification pass counts each nominee's real
    // occurrences and keeps only those above the floor(n/3) bar.
    const threshold = Math.floor(nums.length / 3);
    let total1 = 0;
    let total2 = 0;
    for (const value of nums) {
        if (value === candidate1) {
            total1 += 1;
        } else if (value === candidate2) {
            total2 += 1;
        }
    }
    const result: number[] = [];
    if (total1 > threshold) result.push(candidate1);
    if (candidate2 !== candidate1 && total2 > threshold) result.push(candidate2);
    // At most two answers survive; sorting pins the ascending order the
    // examples show.
    return result.sort((a, b) => a - b);
}
