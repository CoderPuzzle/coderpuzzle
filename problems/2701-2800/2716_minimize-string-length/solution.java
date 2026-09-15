class Solution {

    public int minimizedStringLength(String s) {
        boolean[] seen = new boolean[26];
        for (int index = 0; index < s.length(); index++) {
            seen[s.charAt(index) - 'a'] = true;
        }
        int count = 0;
        for (boolean present : seen) {
            if (present) {
                count++;
            }
        }
        return count;
    }
}
