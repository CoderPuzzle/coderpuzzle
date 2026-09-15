function kMirror(k: number, n: number): number {
    const makePalindrome = (prefix: number, oddLength: boolean): number => {
        let palindrome = prefix;
        let remaining = oddLength ? Math.floor(prefix / 10) : prefix;
        while (remaining > 0) {
            palindrome = palindrome * 10 + (remaining % 10);
            remaining = Math.floor(remaining / 10);
        }
        return palindrome;
    };
    const isBasePalindrome = (candidate: number): boolean => {
        const original = candidate;
        let reversed = 0;
        while (candidate > 0) {
            reversed = reversed * k + (candidate % k);
            candidate = Math.floor(candidate / k);
        }
        return reversed === original;
    };

    let total = 0;
    let found = 0;
    for (let length = 1; found < n; length++) {
        const halfLength = Math.floor((length + 1) / 2);
        const start = 10 ** (halfLength - 1);
        const end = 10 ** halfLength;
        for (let prefix = start; prefix < end; prefix++) {
            const candidate = makePalindrome(prefix, length % 2 === 1);
            if (isBasePalindrome(candidate)) {
                total += candidate;
                found++;
                if (found === n) {
                    return total;
                }
            }
        }
    }
    return total;
}
