class Solution {

    public int magicalString(int n) {
        // The string is its own run-length encoding: grouping it into
        // runs of equal characters yields lengths that spell the string
        // again ("1 22 11 2 ..." → lengths "1 2 2 1 ..."). Seed the
        // prefix 1, 2, 2; a read pointer walks that prefix as the count
        // sequence while a write pointer appends s[read] copies of the
        // flip character, which alternates between 1 and 2 from group to
        // group. Generate until n elements exist, then count the 1s in
        // the first n.
        int[] s = new int[Math.max(n, 3)];
        s[0] = 1;
        s[1] = 2;
        s[2] = 2;
        int write = 3;
        int read = 2;
        int flip = 1;
        while (write < n) {
            int count = s[read];
            read++;
            for (int i = 0; i < count && write < n; i++) {
                s[write] = flip;
                write++;
            }
            flip = 3 - flip;
        }
        int ones = 0;
        for (int i = 0; i < n; i++) {
            if (s[i] == 1) {
                ones++;
            }
        }
        return ones;
    }
}
