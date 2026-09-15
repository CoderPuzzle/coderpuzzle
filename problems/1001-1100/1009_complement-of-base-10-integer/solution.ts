function bitwiseComplement(n: number): number {
    // Grow a run of ones (1 -> 11 -> 111 -> ...) until it's at least as wide
    // as n's own binary representation; XOR-ing with that window flips
    // every bit n occupies and nothing above it.
    let mask = 1;
    while (mask < n) {
        mask = mask * 2 + 1;
    }
    return n ^ mask;
}
