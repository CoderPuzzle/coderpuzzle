var maxSum = function (nums, k, mul) {
    nums.sort((a, b) => b - a);
    let answer = 0,
        take = Math.min(k, Math.max(0, mul - 1));
    for (let i = 0; i < k; i++) answer += nums[i] * (i < take ? mul - i : 1);
    return answer;
};
