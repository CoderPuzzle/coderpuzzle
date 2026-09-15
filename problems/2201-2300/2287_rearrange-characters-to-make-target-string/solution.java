class Solution {

    public int rearrangeCharacters(String s, String target) {
        int[] have = new int[26];
        int[] need = new int[26];
        for (char ch : s.toCharArray()) have[ch - 'a']++;
        for (char ch : target.toCharArray()) need[ch - 'a']++;
        int answer = 100;
        for (int ch = 0; ch < 26; ch++) {
            if (need[ch] > 0) answer = Math.min(answer, have[ch] / need[ch]);
        }
        return answer;
    }
}
