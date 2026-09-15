class Solution {

    public int calculateTime(String keyboard, String word) {
        int[] index = new int[26];
        for (int i = 0; i < 26; ++i) index[keyboard.charAt(i) - 'a'] = i;
        int total = 0;
        int position = 0;
        for (int i = 0; i < word.length(); ++i) {
            int target = index[word.charAt(i) - 'a'];
            total += Math.abs(target - position);
            position = target;
        }
        return total;
    }
}
