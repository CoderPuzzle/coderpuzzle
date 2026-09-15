function countKConstraintSubstrings(s: string, k: number): number {
    const n = s.length;
    let answer = 0;
    for (let left = 0; left < n; left++) {
        let zeros = 0;
        for (let right = left; right < n; right++) {
            if (s[right] === "0") {
                zeros++;
            }
            const ones = right - left + 1 - zeros;
            if (zeros <= k || ones <= k) {
                answer++;
            }
        }
    }
    return answer;
}
