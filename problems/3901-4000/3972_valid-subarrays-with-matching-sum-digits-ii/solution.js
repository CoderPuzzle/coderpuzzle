/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var countValidSubarrays = function (nums, x) {
    const n = nums.length;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];

    let answer = 0;
    // Window p covers sums whose first digit is x: [x*10^p, (x+1)*10^p-1].
    // Prefix sums stay below 10^14 and answers below n*(n+1)/2 < 2^53, so
    // doubles are exact throughout.
    let scale = 1;
    for (let w = 0; w < 16; w++) {
        const lo = x * scale;
        const hi = (x + 1) * scale - 1;
        scale *= 10;
        if (lo > prefix[n]) break;
        let left = 0;
        let entered = 0; // prefix indices [left, entered) are inside the window
        const residue = new Array(10).fill(0);
        for (let j = 1; j <= n; j++) {
            const floor = prefix[j] - hi;
            const ceiling = prefix[j] - lo;
            while (entered < j && prefix[entered] <= ceiling) {
                residue[prefix[entered] % 10]++;
                entered++;
            }
            while (prefix[left] < floor) {
                residue[prefix[left] % 10]--;
                left++;
            }
            answer += residue[(((prefix[j] - x) % 10) + 10) % 10];
        }
    }
    return answer;
};
