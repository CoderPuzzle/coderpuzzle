class Solution {

    public int numberOfSubstrings(String s) {
        // last occurrence of a/b/c so far; -1 = letter not seen yet
        int[] last = { -1, -1, -1 };
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            int idx = s.charAt(i) - 'a';
            if (idx >= 0 && idx <= 2) {
                last[idx] = i;
            }
            // substring s[l..i] is valid iff l <= min(last): every such left
            // endpoint yields one valid substring ending at i (0 until all seen)
            count += Math.min(last[0], Math.min(last[1], last[2])) + 1;
        }
        return count;
    }
}
