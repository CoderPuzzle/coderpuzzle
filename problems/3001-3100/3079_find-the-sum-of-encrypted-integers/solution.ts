function sumOfEncryptedInt(nums: number[]): number {
    // Encrypting x keeps its digit count but replaces every digit with
    // the largest one, so the result is largest * repunit(length). Both
    // fall out of one digit scan: p grows as 1, 11, 111, ... while m
    // tracks the max digit seen. Sums stay under 50 * 1111, far below
    // 2^53, so Number arithmetic is exact.
    let total = 0;
    for (const num of nums) {
        let value = num;
        let largest = 0;
        let repunit = 0;
        while (value > 0) {
            largest = Math.max(largest, value % 10);
            repunit = repunit * 10 + 1;
            value = Math.floor(value / 10);
        }
        total += largest * repunit;
    }
    return total;
}
