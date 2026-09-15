function prefixesDivBy5(nums: number[]): boolean[] {
    const answer: boolean[] = [];
    let rem = 0;
    for (const bit of nums) {
        rem = (rem * 2 + bit) % 5;
        answer.push(rem === 0);
    }
    return answer;
}
