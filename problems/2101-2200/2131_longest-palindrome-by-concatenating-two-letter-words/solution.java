class Solution {

    public int longestPalindrome(String[] words) {
        int[][] waiting = new int[26][26];
        int length = 0;
        for (String word : words) {
            int first = word.charAt(0) - 'a';
            int second = word.charAt(1) - 'a';
            if (waiting[second][first] > 0) {
                waiting[second][first]--;
                length += 4;
            } else {
                waiting[first][second]++;
            }
        }
        for (int letter = 0; letter < 26; letter++) {
            if (waiting[letter][letter] > 0) {
                return length + 2;
            }
        }
        return length;
    }
}
