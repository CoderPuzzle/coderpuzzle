class Solution {

    public int partitionString(String s) {
        int count = 1;
        int seen = 0;
        for (int i = 0; i < s.length(); i++) {
            int bit = 1 << (s.charAt(i) - 'a');
            if ((seen & bit) != 0) {
                count++;
                seen = bit;
            } else {
                seen |= bit;
            }
        }
        return count;
    }
}
