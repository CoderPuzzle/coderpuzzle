class Solution {

    public int countOfSubstrings(String word, int k) {
        // For each start, grow the window rightward maintaining a 5-bit
        // vowel mask and a running consonant total; count every end where
        // all five vowels are present and exactly k consonants are inside.
        int n = word.length();
        int total = 0;
        for (int start = 0; start < n; ++start) {
            int seen = 0;
            int consonants = 0;
            for (int end = start; end < n; ++end) {
                switch (word.charAt(end)) {
                    case 'a' -> seen |= 1 << 0;
                    case 'e' -> seen |= 1 << 1;
                    case 'i' -> seen |= 1 << 2;
                    case 'o' -> seen |= 1 << 3;
                    case 'u' -> seen |= 1 << 4;
                    default -> consonants++;
                }
                if (seen == 31 && consonants == k) {
                    total++;
                }
            }
        }
        return total;
    }
}
