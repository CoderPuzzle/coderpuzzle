function largestInteger(n: number, s: number): number {
    if (s > 9 * n) return -1;
    if (s === 0) return 0;
    let answer = 0;
    for (let i = 0; i < n; i++) {
        const digit = Math.min(9, s);
        answer = answer * 10 + digit;
        s -= digit;
    }
    return answer;
}
