function canArrange(arr: number[], k: number): boolean {
    const freq = new Array<number>(k).fill(0);
    for (const x of arr) {
        freq[((x % k) + k) % k] += 1;
    }
    // the zero class must pair within itself -> even count
    if (freq[0] % 2 !== 0) return false;
    // complementary classes r and k-r must match exactly (any pairing
    // inside matched classes works, so counts alone decide)
    for (let i = 1; i <= Math.floor(k / 2); i++) {
        if (freq[i] !== freq[k - i]) return false;
    }
    return true;
}
