function maxSubarraySum(nums: number[], k: number): number {
    const NEG = -1e30;
    let none = NEG;
    let multiply = NEG;
    let divide = NEG;
    let done = NEG;
    let answer = NEG;
    const trunc = (value: number) => Math.trunc(value / k);

    for (const value of nums) {
        const multiplied = value * k;
        const divided = trunc(value);
        const prevNone = none;
        const prevMultiply = multiply;
        const prevDivide = divide;
        const prevDone = done;
        none = Math.max(value, prevNone + value);
        multiply = Math.max(multiplied, prevNone + multiplied, prevMultiply + multiplied);
        divide = Math.max(divided, prevNone + divided, prevDivide + divided);
        done = Math.max(prevMultiply + value, prevDivide + value, prevDone + value);
        answer = Math.max(answer, none, multiply, divide, done);
    }
    return answer;
}
