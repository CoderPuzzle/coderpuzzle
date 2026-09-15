function minimumSeconds(nums: number[]): number {
    const firstSeen = new Map<number, number>();
    const lastSeen = new Map<number, number>();
    const maxForwardGap = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (firstSeen.has(num)) {
            const gap = i - lastSeen.get(num)!;
            maxForwardGap.set(num, Math.max(maxForwardGap.get(num)!, gap));
        } else {
            firstSeen.set(num, i);
            maxForwardGap.set(num, 0);
        }
        lastSeen.set(num, i);
    }
    let answer = nums.length;
    for (const [num, start] of firstSeen) {
        const gap = Math.max(maxForwardGap.get(num)!, nums.length - lastSeen.get(num)! + start);
        answer = Math.min(answer, Math.floor(gap / 2));
    }
    return answer;
}
