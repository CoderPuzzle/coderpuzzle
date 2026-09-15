impl Solution {
    pub fn maximum_white_tiles(tiles: Vec<Vec<i32>>, carpet_len: i32) -> i32 {
        // Sort by start, then slide a window of intervals whose left ends fall
        // inside the carpet. Aligning the carpet's left edge with a tile start
        // is always optimal, so trying every tile as the first covered one is
        // enough. Non-overlapping tiles in [1, 1e9] keep every sum within i32,
        // but the reach l + carpetLen - 1 can approach 2e9.
        let mut tiles = tiles;
        tiles.sort();
        let n = tiles.len();
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + (tiles[i][1] - tiles[i][0] + 1) as i64;
        }
        let mut ans: i64 = 0;
        let mut j = 0;
        for i in 0..n {
            let end = tiles[i][0] as i64 + carpet_len as i64 - 1;
            while j < n && tiles[j][0] as i64 <= end {
                j += 1;
            }
            let mut covered = prefix[j] - prefix[i];
            if tiles[j - 1][1] as i64 > end {
                covered -= tiles[j - 1][1] as i64 - end;
            }
            ans = ans.max(covered);
        }
        ans as i32
    }
}
