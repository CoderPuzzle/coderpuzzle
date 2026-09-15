class Solution {

    public int findSmallestInteger(int[] nums, int value) {
        // Adding or subtracting value never changes an element's
        // residue mod value, so element x can be retargeted anywhere
        // in its own residue class. Count how many elements land in
        // each residue (normalised, since % keeps the dividend's sign),
        // then consume targets 0, 1, 2, ... in order — target t draws
        // one element from class t % value. The first target whose
        // class is exhausted is the largest achievable MEX.
        int[] count = new int[value];
        for (int x : nums) {
            int r = x % value;
            if (r < 0) {
                r += value;
            }
            count[r]++;
        }
        int mex = 0;
        while (count[mex % value] > 0) {
            count[mex % value]--;
            mex++;
        }
        return mex;
    }
}
