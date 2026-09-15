function removeTrailingZeros(num: string): string {
    // Walk backward from the end while the current digit is '0'; the
    // skipped suffix is exactly the trailing zeros. num represents a
    // positive integer with no leading zeros, so some digit is non-zero
    // and the scan always stops in bounds.
    let i = num.length - 1;
    while (num[i] === "0") {
        --i;
    }
    return num.slice(0, i + 1);
}
