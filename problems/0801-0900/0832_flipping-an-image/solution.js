/**
 * @param {number[][]} image
 * @return {number[][]}
 */
var flipAndInvertImage = function (image) {
    // Cell (i, j) of the answer is 1 - image[i][n - 1 - j]: the reversal
    // and the inversion fold into a single exchange, so one two-pointer
    // sweep per row writes row[left] ^ 1 and row[right] ^ 1 in one swap.
    // XOR by 1 is the invert — 0 ^ 1 = 1, 1 ^ 1 = 0. The middle cell of
    // an odd-width row meets only itself in the sweep, so it is inverted
    // once, in place, afterwards.
    const n = image.length;
    const mid = n >> 1;
    const odd = n % 2 === 1;
    for (const row of image) {
        let left = 0;
        let right = n - 1;
        while (left < right) {
            const invertedLeft = row[left] ^ 1;
            const invertedRight = row[right] ^ 1;
            row[left] = invertedRight;
            row[right] = invertedLeft;
            left += 1;
            right -= 1;
        }
        if (odd) {
            row[mid] ^= 1;
        }
    }
    return image;
};
