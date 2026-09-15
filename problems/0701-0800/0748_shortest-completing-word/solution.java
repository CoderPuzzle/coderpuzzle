class Solution {

    public String shortestCompletingWord(String licensePlate, String[] words) {
        // The plate's demand: how many of each letter a word must supply.
        // ASCII puts every uppercase letter in 65..90 and its lowercase
        // twin 32 codes higher, so one range check + 32 folds the case;
        // digits and spaces match neither range and demand nothing.
        int[] plate = new int[26];
        for (int i = 0; i < licensePlate.length(); i++) {
            char c = licensePlate.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                c = (char) (c + 32);
            }
            if (c >= 'a' && c <= 'z') {
                plate[c - 'a']++;
            }
        }
        String best = "";
        for (String word : words) {
            // First-wins: only a strictly shorter word can displace the
            // best seen so far, so equal or longer words are skipped
            // without even counting their letters.
            if (!best.isEmpty() && word.length() >= best.length()) {
                continue;
            }
            int[] counts = new int[26];
            for (int i = 0; i < word.length(); i++) {
                counts[word.charAt(i) - 'a']++;
            }
            // Covering: the word holds at least the plate's multiplicity
            // of every letter. Extra letters are free.
            boolean completes = true;
            for (int i = 0; i < 26; i++) {
                if (counts[i] < plate[i]) {
                    completes = false;
                    break;
                }
            }
            if (completes) {
                best = word;
            }
        }
        // The statement guarantees a completing word exists, so best is
        // never empty on valid input.
        return best;
    }
}
