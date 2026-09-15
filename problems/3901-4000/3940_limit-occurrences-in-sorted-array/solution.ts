function limitOccurrences(nums: number[], k: number): number[] {
    const answer: number[] = [];
    let seen = 0;
    let previous: number | undefined;
    for (const value of nums) {
        if (value !== previous) {
            previous = value;
            seen = 0;
        }
        if (seen < k) {
            answer.push(value);
            seen++;
        }
    }
    return answer;
}
