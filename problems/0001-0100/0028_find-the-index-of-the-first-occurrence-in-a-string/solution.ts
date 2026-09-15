function strStr(haystack: string, needle: string): number {
    // The empty needle occurs at every index by convention; the first is 0.
    if (needle.length === 0) return 0;
    const m = needle.length;
    // lps[i]: length of the longest proper prefix of needle.slice(0, i + 1)
    // that is also a suffix of it — how much of a partial match survives a
    // mismatch at the next character.
    const lps: number[] = new Array(m).fill(0);
    let k = 0;
    for (let i = 1; i < m; ++i) {
        while (k > 0 && needle[i] !== needle[k]) k = lps[k - 1];
        if (needle[i] === needle[k]) ++k;
        lps[i] = k;
    }
    // Scan haystack once; k counts the needle characters currently matched
    // ending at haystack[i]. On mismatch k falls back to the longest needle
    // prefix that is still a suffix of the matched window, not to zero.
    k = 0;
    for (let i = 0; i < haystack.length; ++i) {
        while (k > 0 && haystack[i] !== needle[k]) k = lps[k - 1];
        if (haystack[i] === needle[k]) ++k;
        if (k === m) return i - m + 1;
    }
    return -1;
}
