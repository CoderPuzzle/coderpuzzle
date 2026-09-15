function freqAlphabets(s: string): string {
    // A '#' disambiguates backwards, so scan from the right: at each position
    // either a '#' sits two places ahead (three-char token) or the digit
    // stands alone as a single letter.
    const out: string[] = [];
    let i = s.length - 1;
    while (i >= 0) {
        let value: number;
        if (s[i] === "#") {
            value = Number(s.slice(i - 2, i));
            i -= 3;
        } else {
            value = Number(s[i]);
            i -= 1;
        }
        out.push(String.fromCharCode(97 + value - 1));
    }
    return out.reverse().join("");
}
