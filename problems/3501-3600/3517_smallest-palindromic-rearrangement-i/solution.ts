function smallestPalindrome(s: string): string {
    // A palindrome is (half) + (odd char, at most one) + reverse(half),
    // and the half's multiset is forced: exactly count[c] // 2 of each
    // letter. So the smallest palindrome is the sorted half, mirrored.
    const counts = new Array<number>(26).fill(0);
    for (const ch of s) {
        counts[ch.charCodeAt(0) - 97] += 1;
    }
    const half: string[] = [];
    let middle = "";
    for (let i = 0; i < 26; ++i) {
        if (counts[i] > 0) half.push(String.fromCharCode(97 + i).repeat(counts[i] >> 1));
        if (counts[i] % 2 === 1) middle = String.fromCharCode(97 + i);
    }
    return half.join("") + middle + half.reverse().join("");
}
