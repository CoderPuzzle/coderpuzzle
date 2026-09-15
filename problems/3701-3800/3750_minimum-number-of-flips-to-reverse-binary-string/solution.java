class Solution {

    public int minimumFlips(int n) {
        // The binary form without leading zeros.
        String s = Integer.toBinaryString(n);
        // Walk inward from both ends. When the two bits of a pair differ,
        // each end sits on a position whose required bit is the opposite
        // end's bit, so the pair pays exactly two flips.
        int flips = 0;
        for (int left = 0, right = s.length() - 1; left < right; left++, right--) {
            if (s.charAt(left) != s.charAt(right)) {
                flips += 2;
            }
        }
        return flips;
    }
}
