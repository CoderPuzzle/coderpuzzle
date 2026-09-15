// For every pair j < k with nums[k] < nums[j], a quadruplet is any i < j
// with nums[i] < nums[k] plus any l > k with nums[l] > nums[j]. Each j
// rebuilds the less-than row and sweeps its window right-to-left carrying
// the suffix-greater count. Answers top out at C(4000,4) =
// 10650673999000 < 2^53, so Number addition stays integer-exact.
function countQuadruplets(nums: number[]): number {
    const n = nums.length;
    const less: number[] = new Array(n + 2).fill(0);
    let ans = 0;
    for (let j = 1; j <= n - 3; j++) {
        for (let x = nums[j - 1] + 1; x <= n; x++) less[x]++;
        const vj = nums[j];
        let tot = 0;
        let c = 0;
        for (let k = n - 1; k > j; k--) {
            const uk = nums[k];
            if (uk < vj) tot += less[uk] * c;
            else if (uk > vj) c++;
        }
        ans += tot;
    }
    return ans;
}
