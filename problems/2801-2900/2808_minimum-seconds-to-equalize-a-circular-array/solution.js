/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumSeconds = function (nums) {
    const firstSeen = new Map();
    const lastSeen = new Map();
    const maxForwardGap = new Map();
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (firstSeen.has(num)) {
            const gap = i - lastSeen.get(num);
            maxForwardGap.set(num, Math.max(maxForwardGap.get(num), gap));
        } else {
            firstSeen.set(num, i);
            maxForwardGap.set(num, 0);
        }
        lastSeen.set(num, i);
    }
    let answer = nums.length;
    for (const [num, start] of firstSeen) {
        const gap = Math.max(maxForwardGap.get(num), nums.length - lastSeen.get(num) + start);
        answer = Math.min(answer, Math.floor(gap / 2));
    }
    return answer;
};
