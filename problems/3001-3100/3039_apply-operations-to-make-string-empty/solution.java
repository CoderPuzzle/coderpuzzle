class Solution {

    public String lastNonEmptyString(String s) {
        int[] counts = new int[26];
        for (int index = 0; index < s.length(); index++) {
            counts[s.charAt(index) - 'a']++;
        }
        int top = 0;
        for (int count : counts) {
            top = Math.max(top, count);
        }
        boolean[] taken = new boolean[26];
        StringBuilder kept = new StringBuilder();
        for (int index = s.length() - 1; index >= 0; index--) {
            int slot = s.charAt(index) - 'a';
            if (counts[slot] == top && !taken[slot]) {
                taken[slot] = true;
                kept.append(s.charAt(index));
            }
        }
        return kept.reverse().toString();
    }
}
