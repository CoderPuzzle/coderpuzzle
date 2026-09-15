function removePalindromeSub(s: string): number {
    // One letter's positions form a palindrome by themselves, so two steps
    // always suffice; a single step works iff s is a palindrome.
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) return 2;
        ++left;
        --right;
    }
    return 1;
}
