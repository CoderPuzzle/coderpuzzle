class Solution {

    public int maxVowels(String s, int k) {
        // count vowels of the first window once; afterwards only the
        // entering letter (i) and the leaving letter (i-k) can change it
        int count = 0;
        for (int i = 0; i < k && i < s.length(); i++) {
            if (isVowel(s.charAt(i))) count++;
        }
        int best = count;
        for (int i = k; i < s.length(); i++) {
            if (isVowel(s.charAt(i))) count++;
            if (isVowel(s.charAt(i - k))) count--;
            best = Math.max(best, count);
        }
        return best;
    }

    private boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
}
