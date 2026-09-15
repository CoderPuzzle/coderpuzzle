// Cell (i, j) of the answer is 1 - image[i][n - 1 - j]: the reversal and
// the inversion fold into a single exchange, so one two-pointer sweep per
// row writes row[left] ^ 1 and row[right] ^ 1 in one swap. XOR by 1 is the
// invert — 0 ^ 1 = 1, 1 ^ 1 = 0. The middle cell of an odd-width row meets
// only itself in the sweep, so it is inverted once, in place, afterwards.
impl Solution {
    pub fn flip_and_invert_image(mut image: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let n = image.len();
        for row in image.iter_mut() {
            let (mut left, mut right) = (0, n - 1);
            while left < right {
                let inverted_left = row[left] ^ 1;
                let inverted_right = row[right] ^ 1;
                row[left] = inverted_right;
                row[right] = inverted_left;
                left += 1;
                right -= 1;
            }
            if n % 2 == 1 {
                row[n / 2] ^= 1;
            }
        }
        image
    }
}
