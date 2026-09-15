function partition(s: string): string[][] {
    const n = s.length;
    // Table of palindrome verdicts for every interval s[i..j].
    const isPal: boolean[][] = Array.from({ length: n }, () => new Array<boolean>(n).fill(false));
    // Reverse i ensures the inner interval is computed before any outer
    // interval that reads it.
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            // Palindrome iff ends match and the interior is empty or pal.
            if (s[i] === s[j] && (j - i < 2 || isPal[i + 1][j - 1])) {
                isPal[i][j] = true;
            }
        }
    }

    const result: string[][] = [];
    const current: string[] = [];

    function backtrack(start: number): void {
        if (start === n) {
            // The pieces tile the whole string: snapshot the partition.
            result.push(current.slice());
            return;
        }
        // Increasing `end` yields shorter first pieces before longer ones,
        // producing the required output order.
        for (let end = start; end < n; end++) {
            if (isPal[start][end]) {
                current.push(s.substring(start, end + 1));
                backtrack(end + 1);
                current.pop();
            }
        }
    }

    backtrack(0);
    return result;
}
