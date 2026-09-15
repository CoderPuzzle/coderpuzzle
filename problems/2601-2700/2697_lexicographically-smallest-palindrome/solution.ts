function makeSmallestPalindrome(s: string): string {
    // A mismatched mirror pair needs one rewrite whichever letter wins;
    // keeping the smaller is never worse for any earlier position.
    const chars: string[] = s.split("");
    for (let left = 0, right = s.length - 1; left < right; left++, right--) {
        if (chars[left] !== chars[right]) {
            const keep: string = chars[left] < chars[right] ? chars[left] : chars[right];
            chars[left] = keep;
            chars[right] = keep;
        }
    }
    return chars.join("");
}
