function maxSumOfSquares(num: number, sum: number): string {
    // Even nine in every position falls short: no good integer exists.
    if (sum > 9 * num) {
        return "";
    }
    // The optimal digits are forced — floor(sum / 9) nines plus at most
    // one leftover r — and descending order is the largest arrangement,
    // so lay them out from the left and pad with zeros. Math.floor keeps
    // the quotient an integer under JS number division.
    const q = Math.floor(sum / 9);
    const r = sum % 9;
    let head = "9".repeat(q);
    if (r > 0) {
        head += String(r);
    }
    return head + "0".repeat(num - head.length);
}
