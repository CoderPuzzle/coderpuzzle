function maxProduct(s: string): number {
    const size = 1 << s.length;
    const palindromeLength: number[] = new Array(size).fill(0);

    for (let mask = 1; mask < size; ++mask) {
        const subsequence: string[] = [];
        for (let index = 0; index < s.length; ++index) {
            if (mask & (1 << index)) subsequence.push(s[index]);
        }
        if (subsequence.join("") === subsequence.reverse().join("")) {
            palindromeLength[mask] = subsequence.length;
        }
    }

    let answer = 0;
    const full = size - 1;
    for (let first = 1; first < size; ++first) {
        if (palindromeLength[first] === 0) continue;
        const remaining = full ^ first;
        for (let second = remaining; second !== 0; second = (second - 1) & remaining) {
            answer = Math.max(answer, palindromeLength[first] * palindromeLength[second]);
        }
    }
    return answer;
}
