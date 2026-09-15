function largestEvenSum(nums: number[], k: number): number {
    nums.sort((a, b) => b - a);
    let total = 0;
    const smallestSelected = [-1, -1];
    for (const value of nums.slice(0, k)) {
        total += value;
        smallestSelected[value % 2] = value;
    }
    if (total % 2 === 0) return total;

    const largestUnselected = [-1, -1];
    for (const value of nums.slice(k)) {
        const parity = value % 2;
        if (largestUnselected[parity] === -1) largestUnselected[parity] = value;
    }

    let answer = -1;
    for (let parity = 0; parity < 2; parity++) {
        if (smallestSelected[parity] !== -1 && largestUnselected[1 - parity] !== -1) {
            answer = Math.max(answer, total - smallestSelected[parity] + largestUnselected[1 - parity]);
        }
    }
    return answer;
}
