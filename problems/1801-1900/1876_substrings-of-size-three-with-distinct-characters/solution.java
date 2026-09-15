class Solution {

    // A length-3 window is good iff its three characters are pairwise
    // distinct; slide the center and count.
    public int countGoodSubstrings(String s) {
        int n = s.length();
        int count = 0;
        for (int i = 1; i + 1 < n; i++) {
            char a = s.charAt(i - 1);
            char b = s.charAt(i);
            char c = s.charAt(i + 1);
            if (a != b && b != c && a != c) {
                count++;
            }
        }
        return count;
    }
}
