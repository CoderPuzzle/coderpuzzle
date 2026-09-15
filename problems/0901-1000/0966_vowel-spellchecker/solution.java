import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public String[] spellchecker(String[] wordlist, String[] queries) {
        // One pass over the wordlist builds all three lookups; putIfAbsent
        // keeps the FIRST word claiming each key — first-match-wins.
        Set<String> exact = new HashSet<>();
        Map<String, String> byLower = new HashMap<>();
        Map<String, String> byDevowel = new HashMap<>();
        for (String w : wordlist) {
            exact.add(w);
            String low = lower(w);
            byLower.putIfAbsent(low, w);
            byDevowel.putIfAbsent(devowel(low), w);
        }
        // Each query walks the tiers in precedence order: exact echo, then
        // case-insensitive, then vowel-blind, then "".
        String[] answer = new String[queries.length];
        for (int i = 0; i < queries.length; i++) {
            String q = queries[i];
            if (exact.contains(q)) {
                answer[i] = q;
                continue;
            }
            String low = lower(q);
            String hit = byLower.getOrDefault(low, byDevowel.get(devowel(low)));
            answer[i] = hit == null ? "" : hit;
        }
        return answer;
    }

    private static String lower(String s) {
        StringBuilder b = new StringBuilder(s.length());
        for (int i = 0; i < s.length(); i++) {
            b.append(Character.toLowerCase(s.charAt(i)));
        }
        return b.toString();
    }

    private static String devowel(String low) {
        StringBuilder b = new StringBuilder(low.length());
        for (int i = 0; i < low.length(); i++) {
            char c = low.charAt(i);
            b.append(isVowel(c) ? '*' : c);
        }
        return b.toString();
    }

    private static boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
}
