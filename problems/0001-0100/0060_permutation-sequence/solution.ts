function getPermutation(n: number, k: number): string {
    // Digits stay sorted, so the index computed below is the position of
    // the chosen digit among the digits still available.
    const digits: string[] = [];
    for (let value = 1; value <= n; ++value) digits.push(String(value));
    // factorials[block] = block! — the size of one block at a position
    // with `block` positions still unfilled after it.
    const factorials: number[] = [1];
    for (let value = 1; value <= n; ++value) factorials.push(factorials[value - 1] * value);
    let rank = k - 1;
    let result = "";
    for (let block = n - 1; block >= 0; --block) {
        // Quotient picks the digit, remainder is the rank inside its block.
        const index = Math.floor(rank / factorials[block]);
        rank %= factorials[block];
        result += digits.splice(index, 1)[0];
    }
    return result;
}
