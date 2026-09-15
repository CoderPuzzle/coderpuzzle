class Solution {

    public String getSmallestString(int n, int k) {
        // Fill from the end. At a position with i open slots before it,
        // reserve one unit per open slot and spend everything else here,
        // capped at z. The first time the cap stops binding, the reserve
        // drops to exactly the open count and every earlier slot is 'a'.
        char[] chars = new char[n];
        long remaining = k;
        for (int i = n - 1; i >= 0; i--) {
            long value = Math.min(26, remaining - i);
            chars[i] = (char) ('a' + value - 1);
            remaining -= value;
        }
        return new String(chars);
    }
}
