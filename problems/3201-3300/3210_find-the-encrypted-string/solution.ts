function getEncryptedString(s: string, k: number): string {
    // The encrypted string is the input rotated left by k positions:
    // position i of the answer reads s[(i + k) % n], the character k
    // places forward with wraparound. The modulo folds completed laps
    // back into range, so k larger than n needs no special case — one
    // linear pass copies every character from its source index.
    const n = s.length;
    let encrypted = "";
    for (let i = 0; i < n; ++i) {
        encrypted += s[(i + k) % n];
    }
    return encrypted;
}
