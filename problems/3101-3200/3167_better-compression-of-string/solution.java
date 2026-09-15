class Solution {

    public String betterCompression(String compressed) {
        int[] counts = new int[26];
        int i = 0;
        int n = compressed.length();
        while (i < n) {
            int letter = compressed.charAt(i) - 'a';
            i++;
            int freq = 0;
            while (i < n && Character.isDigit(compressed.charAt(i))) {
                freq = freq * 10 + (compressed.charAt(i) - '0');
                i++;
            }
            counts[letter] += freq;
        }
        StringBuilder result = new StringBuilder();
        for (int letter = 0; letter < 26; letter++) {
            if (counts[letter] > 0) {
                result.append((char) ('a' + letter)).append(counts[letter]);
            }
        }
        return result.toString();
    }
}
