/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfFlooredPairs = function (nums) {
    var MOD = 1000000007;
    if (nums.length === 0) {
        return 0;
    }
    var maxVal = 0;
    for (var i = 0; i < nums.length; i++) {
        if (nums[i] > maxVal) maxVal = nums[i];
    }
    var count = new Array(maxVal + 1).fill(0);
    for (var i2 = 0; i2 < nums.length; i2++) {
        count[nums[i2]] += 1;
    }
    var prefix = new Array(maxVal + 1);
    var running = 0;
    for (var v = 0; v <= maxVal; v++) {
        running += count[v];
        prefix[v] = running;
    }
    var total = 0;
    for (var y = 1; y <= maxVal; y++) {
        if (count[y] === 0) {
            continue;
        }
        // sum over x of floor(x / y) * count[x]
        // = sum over m >= 1 of #{x : x >= m * y}
        var c = 0;
        for (var m = y; m <= maxVal; m += y) {
            c += prefix[maxVal] - prefix[m - 1];
        }
        total = (total + count[y] * c) % MOD;
    }
    return total;
};
