// Flood exactly the pixels 4-directionally connected to the seed that
// still carry the seed's ORIGINAL color. Iterating with an explicit queue
// is the point — a serpentine component at the bound chains thousands of
// cells deep, far past any call stack a submission is granted.
impl Solution {
    pub fn flood_fill(mut image: Vec<Vec<i32>>, sr: i32, sc: i32, color: i32) -> Vec<Vec<i32>> {
        let m = image.len();
        let n = image[0].len();
        let (sr, sc) = (sr as usize, sc as usize);
        let original = image[sr][sc];
        if original == color {
            // Recoloring to the color already there changes nothing, and
            // it would erase the distinction the loop below relies on.
            return image;
        }
        // Cells packed as r * n + c in one flat queue; writing the new
        // color as a cell enters it is both the fill and the seen-mark.
        let mut queue: Vec<usize> = Vec::with_capacity(m * n);
        image[sr][sc] = color;
        queue.push(sr * n + sc);
        let mut head = 0;
        while head < queue.len() {
            let cell = queue[head];
            head += 1;
            let r = cell / n;
            let c = cell % n;
            if r > 0 && image[r - 1][c] == original {
                image[r - 1][c] = color;
                queue.push(cell - n);
            }
            if r + 1 < m && image[r + 1][c] == original {
                image[r + 1][c] = color;
                queue.push(cell + n);
            }
            if c > 0 && image[r][c - 1] == original {
                image[r][c - 1] = color;
                queue.push(cell - 1);
            }
            if c + 1 < n && image[r][c + 1] == original {
                image[r][c + 1] = color;
                queue.push(cell + 1);
            }
        }
        image
    }
}
