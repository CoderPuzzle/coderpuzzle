var countValidSubarrays = function (nums, x) {
    let answer = 0;
    for (let left = 0; left < nums.length; left++) {
        let sum = 0;
        for (let right = left; right < nums.length; right++) {
            sum += nums[right];
            let first = sum;
            while (first >= 10) first = Math.floor(first / 10);
            if (first === x && sum % 10 === x) answer++;
        }
    }
    return answer;
};
