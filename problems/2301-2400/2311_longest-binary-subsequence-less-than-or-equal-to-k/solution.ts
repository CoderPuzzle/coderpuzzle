function longestSubsequence(s: string, k: number): number {
    let value = 0;
    let length = 0;
    for (let index = s.length - 1; index >= 0; index--) {
        if (s[index] === "0") {
            length++;
        } else if (length < 30 && value + 2 ** length <= k) {
            value += 2 ** length;
            length++;
        }
    }
    return length;
}
