function queryString(s: string, n: number): boolean {
    // 10^9 fits in 30 bits, so every i in [1, n] has a short binary form;
    // checking each one as a substring of s directly answers the question.
    for (let i = 1; i <= n; i++) {
        const bin = i.toString(2);
        if (!s.includes(bin)) {
            return false;
        }
    }
    return true;
}
