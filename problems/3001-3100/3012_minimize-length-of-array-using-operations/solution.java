class Solution {

    public int minimumArrayLength(int[] nums) {
        // A unique minimum absorbs everything (m % y == m for y > m), and a
        // value not divisible by the minimum forges an even smaller unique
        // minimum — both end at length 1. Otherwise every survivor stays a
        // multiple of m, and only merging two copies of m removes one.
        int m = Integer.MAX_VALUE;
        for (int value : nums) if (value < m) m = value;
        int count = 0;
        boolean indivisible = false;
        for (int value : nums) {
            if (value == m) count++;
            if (value % m != 0) indivisible = true;
        }
        if (count == 1 || indivisible) return 1;
        return (count + 1) / 2;
    }
}
