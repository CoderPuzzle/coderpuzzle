function largestPalindromic(num: string): string {
    // Spend each digit's full pairs into the left half, highest digit
    // first; the largest odd-count digit becomes the center. Zero
    // pairs are worthless without a nonzero digit ahead of them, so a
    // leading-zero half is stripped; all zeros -> "0".
    const cnt = new Array<number>(10).fill(0);
    for (const c of num) {
        ++cnt[c.charCodeAt(0) - 48];
    }
    let half = "";
    let mid = "";
    for (let d = 9; d >= 0; --d) {
        half += String(d).repeat(Math.floor(cnt[d] / 2));
        if (mid === "" && cnt[d] % 2 === 1) {
            mid = String(d);
        }
    }
    half = half.replace(/^0+/, "");
    return half + mid + [...half].reverse().join("") || "0";
}
