class Solution {

    public boolean canConvertString(String s, String t, int k) {
        // equal length is guaranteed by the constraints
        if (s.length() != t.length()) return false;
        // count how many positions need each shift amount d in 1..25
        int[] needCount = new int[26];
        for (int i = 0; i < s.length(); i++) {
            int d = (t.charAt(i) - s.charAt(i) + 26) % 26;
            if (d != 0) needCount[d]++;
        }
        // the j-th position needing shift d must use move d + 26*(j-1)
        for (int d = 1; d < 26; d++) {
            int count = needCount[d];
            if (count == 0) continue;
            long lastMove = (long) d + 26L * (count - 1);
            if (lastMove > k) return false;
        }
        return true;
    }
}
