// `num` can hold 10⁴ digits, far past any fixed-width integer, so the
// addition runs schoolbook-style: right to left, one digit at a time, with
// `k` itself seeding the running carry.
function addToArrayForm(num: number[], k: number): number[] {
    let carry = k;
    const result: number[] = [];
    for (let i = num.length - 1; i >= 0; --i) {
        carry += num[i];
        result.push(carry % 10);
        carry = Math.floor(carry / 10);
    }
    // whatever of k outlives num keeps flowing out one digit at a time
    while (carry > 0) {
        result.push(carry % 10);
        carry = Math.floor(carry / 10);
    }
    // digits were emitted least-significant first
    result.reverse();
    return result;
}
