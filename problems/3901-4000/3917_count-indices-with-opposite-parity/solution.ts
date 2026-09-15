function countOppositeParity(nums: number[]): number[] {
    let even = 0;
    let odd = 0;
    const answer = new Array<number>(nums.length);
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] % 2 === 0) {
            answer[i] = odd;
            even++;
        } else {
            answer[i] = even;
            odd++;
        }
    }
    return answer;
}
