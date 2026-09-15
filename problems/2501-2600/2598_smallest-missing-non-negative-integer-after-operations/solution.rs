impl Solution {
    pub fn find_smallest_integer(nums: Vec<i32>, value: i32) -> i32 {
        // Adding or subtracting value never changes an element's
        // residue mod value, so element x can be retargeted anywhere
        // in its own residue class. Count how many elements land in
        // each residue (normalised, since % keeps the dividend's sign),
        // then consume targets 0, 1, 2, ... in order — target t draws
        // one element from class t % value. The first target whose
        // class is exhausted is the largest achievable MEX.
        let mut count = vec![0i32; value as usize];
        for &x in &nums {
            let r = ((x % value) + value) % value;
            count[r as usize] += 1;
        }
        let mut mex: usize = 0;
        while count[mex % value as usize] > 0 {
            count[mex % value as usize] -= 1;
            mex += 1;
        }
        mex as i32
    }
}
