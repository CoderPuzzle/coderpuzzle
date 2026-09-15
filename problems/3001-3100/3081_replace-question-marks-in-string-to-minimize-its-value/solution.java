import java.util.Arrays;

class Solution {

    public String minimizeStringValue(String s) {
        // A letter appearing x times costs x*(x-1)/2 no matter where it
        // sits, so only the final counts matter: each '?' should take the
        // currently least frequent letter (smallest letter on ties — that
        // also makes the fill lexicographically smallest). The chosen
        // letters are then sorted into the '?' slots left to right. Scanning
        // all 26 counts per '?' is O(26n), well within n = 1e5.
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) != '?') {
                counts[s.charAt(i) - 'a']++;
            }
        }
        int questionMarks = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '?') {
                questionMarks++;
            }
        }
        int[] picks = new int[questionMarks];
        int taken = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '?') {
                int best = 0;
                for (int letter = 1; letter < 26; letter++) {
                    if (counts[letter] < counts[best]) {
                        best = letter;
                    }
                }
                counts[best]++;
                picks[taken++] = best;
            }
        }
        Arrays.sort(picks);
        char[] characters = s.toCharArray();
        int at = 0;
        for (int i = 0; i < characters.length; i++) {
            if (characters[i] == '?') {
                characters[i] = (char) ('a' + picks[at]);
                at++;
            }
        }
        return new String(characters);
    }
}
