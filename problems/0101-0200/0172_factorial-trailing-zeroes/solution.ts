function trailingZeroes(n: number): number {
    // Twos outnumber fives in n!, so each trailing zero costs exactly one
    // factor 5: the answer is Legendre's sum n/5 + n/25 + n/125 + ...
    let count = 0;
    for (let power = 5; power <= n; power *= 5) {
        count += Math.floor(n / power);
    }
    return count;
}
