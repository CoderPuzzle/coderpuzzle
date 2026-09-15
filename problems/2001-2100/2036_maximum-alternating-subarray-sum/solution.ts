function maximumAlternatingSubarraySum(nums: number[]): number {
    let plus = nums[0];
    let minus = 0;
    let hasMinus = false;
    let answer = plus;

    for (let index = 1; index < nums.length; index++) {
        const value = nums[index];
        let newPlus = value;
        if (hasMinus) {
            newPlus = Math.max(newPlus, minus + value);
        }
        const newMinus = plus - value;

        answer = Math.max(answer, newPlus, newMinus);
        plus = newPlus;
        minus = newMinus;
        hasMinus = true;
    }
    return answer;
}
