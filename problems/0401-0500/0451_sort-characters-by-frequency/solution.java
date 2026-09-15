import java.util.Arrays;

class Solution {

    public String frequencySort(String s) {
        // The answer depends only on how often each character occurs, and the
        // alphabet is fixed — one slot per possible character, one pass.
        int[] counts = new int[128];
        for (int i = 0; i < s.length(); ++i) {
            counts[s.charAt(i)]++;
        }
        Integer[] ranked = new Integer[128];
        for (int c = 0; c < 128; ++c) {
            ranked[c] = c;
        }
        // Frequency descending, ties broken by character ascending — the
        // pinned order that makes the expected output unique.
        Arrays.sort(ranked, (a, b) -> counts[b] != counts[a] ? counts[b] - counts[a] : a - b);
        StringBuilder out = new StringBuilder(s.length());
        for (int c : ranked) {
            for (int i = 0; i < counts[c]; ++i) {
                out.append((char) c);
            }
        }
        return out.toString();
    }
}
