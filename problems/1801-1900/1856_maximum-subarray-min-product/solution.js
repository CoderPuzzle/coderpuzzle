/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumMinProduct = function (nums) {
    var MOD = 1000000007;
    var n = nums.length;
    var prefix = new Array(n + 1);
    prefix[0] = 0;
    for (var i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    var best = 0;
    var stack = []; // indices with strictly increasing values
    for (var i = 0; i <= n; i++) {
        var cur = i < n ? nums[i] : 0; // sentinel 0 pops everything
        while (stack.length > 0 && nums[stack[stack.length - 1]] >= cur) {
            var m = nums[stack.pop()];
            var left = stack.length > 0 ? stack[stack.length - 1] : -1;
            var total = prefix[i] - prefix[left + 1];
            best = Math.max(best, m * total);
        }
        if (i < n) {
            stack.push(i);
        }
    }
    return best % MOD;
};
