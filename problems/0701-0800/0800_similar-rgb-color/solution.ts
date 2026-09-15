function similarRGB(color: string): string {
    // A shorthand color repeats one hex digit per channel, so the
    // candidates for one channel are 0x00, 0x11, ..., 0xff — sixteen
    // values spaced 17 apart. The similarity is a sum of independent
    // per-channel squares, so the most similar shorthand takes,
    // channel by channel, the repeated value nearest the input's:
    // digit (value + 8) / 17 in integers. The spacing 17 is odd, so
    // a channel value is never exactly between two candidates — the
    // nearest, and with it the whole answer, is unique.
    const digits = "0123456789abcdef";
    let out = "#";
    for (let i = 1; i <= 5; i += 2) {
        const value = parseInt(color.substring(i, i + 2), 16);
        const c = digits[Math.floor((value + 8) / 17)];
        out += c + c;
    }
    return out;
}
