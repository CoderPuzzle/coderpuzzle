function countDivisibleSubstrings(word: string): number {
    const digit = "11222333444555666777788899";
    const n = word.length;
    const pre = new Array<number>(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        pre[i + 1] = pre[i] + (digit.charCodeAt(word.charCodeAt(i) - 97) - 48);
    }
    let count = 0;
    for (let start = 0; start < n; start++) {
        for (let end = start + 1; end <= n; end++) {
            if ((pre[end] - pre[start]) % (end - start) === 0) {
                count++;
            }
        }
    }
    return count;
}
