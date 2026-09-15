class Solution {

    public long numberOfSpecialSubstrings(String s) {
        // last[c] is the most recent index of c; left is the smallest
        // window start keeping s[left..i] free of repeating characters.
        int[] last = new int[26];
        for (int c = 0; c < 26; c++) {
            last[c] = -1;
        }
        int left = 0;
        long ans = 0;
        for (int i = 0; i < s.length(); i++) {
            int c = s.charAt(i) - 'a';
            // An occurrence left of the window yields last[c] + 1 <= left,
            // so stale entries leave the window untouched.
            left = Math.max(left, last[c] + 1);
            // Every start in [left..i] ends a special substring at i.
            ans += i - left + 1;
            last[c] = i;
        }
        return ans;
    }
}
