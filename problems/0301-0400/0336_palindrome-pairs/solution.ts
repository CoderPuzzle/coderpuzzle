function palindromePairs(words: string[]): number[][] {
    // word -> index: partners are found by hash lookup, not pair scanning.
    const index = new Map<string, number>();
    for (let i = 0; i < words.length; i++) {
        index.set(words[i], i);
    }
    const results = new Set<string>();

    const isPalindrome = function (s: string): boolean {
        let a = 0,
            b = s.length - 1;
        while (a < b) {
            if (s.charAt(a) !== s.charAt(b)) return false;
            a++;
            b--;
        }
        return true;
    };
    const reverse = function (s: string): string {
        return s.split("").reverse().join("");
    };

    for (let j = 0; j < words.length; j++) {
        const w = words[j];
        const length = w.length;
        // For a concatenation to be a palindrome, one half of w must
        // already be one and the mirror of the other half must exist.
        for (let cut = 0; cut <= length; cut++) {
            const prefix = w.slice(0, cut);
            const suffix = w.slice(cut);
            // Palindromic prefix: reverse(suffix) can stand on the left.
            // The !== j check stops a word from pairing with itself.
            if (isPalindrome(prefix)) {
                const rev = reverse(suffix);
                if (index.has(rev) && index.get(rev)! !== j) {
                    results.add(index.get(rev)! + "," + j);
                }
            }
            // Palindromic suffix: reverse(prefix) goes on the right.
            // cut !== length avoids re-emitting the full-string case,
            // which the partner word already finds at its cut 0.
            if (cut !== length && isPalindrome(suffix)) {
                const rev = reverse(prefix);
                if (index.has(rev) && index.get(rev)! !== j) {
                    results.add(j + "," + index.get(rev)!);
                }
            }
        }
    }
    const out: number[][] = [];
    results.forEach(function (key: string) {
        const parts = key.split(",");
        out.push([Number(parts[0]), Number(parts[1])]);
    });
    out.sort(function (a, b) {
        return a[0] - b[0] || a[1] - b[1];
    });
    return out;
}
