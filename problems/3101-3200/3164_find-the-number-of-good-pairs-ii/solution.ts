function numberOfPairs(nums1: number[], nums2: number[], k: number): number {
    let highest = 0;
    for (const num of nums1) {
        if (num > highest) {
            highest = num;
        }
    }
    const counts1 = new Array(highest + 1).fill(0);
    for (const num of nums1) {
        counts1[num]++;
    }
    const counts2 = new Map<number, number>();
    for (const num of nums2) {
        counts2.set(num, (counts2.get(num) || 0) + 1);
    }
    let total = 0;
    for (const [base, amount] of counts2) {
        const step = base * k;
        if (step > highest) {
            continue;
        }
        let divisible = 0;
        for (let value = step; value <= highest; value += step) {
            divisible += counts1[value];
        }
        total += amount * divisible;
    }
    return total;
}
