class Solution {

    public int countCharacters(String[] words, String chars) {
        int[] have = new int[26];
        for (int i = 0; i < chars.length(); ++i) have[chars.charAt(i) - 'a']++;
        int total = 0;
        for (String word : words) {
            int[] need = new int[26];
            for (int i = 0; i < word.length(); ++i) need[word.charAt(i) - 'a']++;
            boolean ok = true;
            for (int i = 0; i < 26; ++i) {
                if (need[i] > have[i]) {
                    ok = false;
                    break;
                }
            }
            if (ok) total += word.length();
        }
        return total;
    }
}
