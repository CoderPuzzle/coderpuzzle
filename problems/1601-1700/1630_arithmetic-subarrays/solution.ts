function checkArithmeticSubarrays(nums: number[], l: number[], r: number[]): boolean[] {
    const answer: boolean[] = [];
    for (let qi = 0; qi < l.length; qi++) {
        // A set of numbers can be rearranged into an arithmetic sequence
        // exactly when its sorted order already is one.
        const sub = nums.slice(l[qi], r[qi] + 1).sort((a, b) => a - b);
        const diff = sub[1] - sub[0];
        let ok = true;
        for (let i = 2; i < sub.length; i++) {
            if (sub[i] - sub[i - 1] !== diff) {
                ok = false;
                break;
            }
        }
        answer.push(ok);
    }
    return answer;
}
