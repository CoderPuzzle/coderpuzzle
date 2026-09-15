class Solution {

    public long numberOfWays(String s) {
        long zeros = 0,
            ones = 0,
            seq01 = 0,
            seq10 = 0,
            total = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '0') {
                total += seq10;
                seq01 += ones;
                zeros++;
            } else {
                total += seq01;
                seq10 += zeros;
                ones++;
            }
        }
        return total;
    }
}
