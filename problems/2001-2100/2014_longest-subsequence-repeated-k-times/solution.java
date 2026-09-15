class Solution {

    private String source;
    private int repetitions;
    private int[] quotas;
    private String best;

    public String longestSubsequenceRepeatedK(String s, int k) {
        source = s;
        repetitions = k;
        quotas = new int[26];
        for (int index = 0; index < s.length(); ++index) {
            ++quotas[s.charAt(index) - 'a'];
        }
        for (int index = 0; index < 26; ++index) {
            quotas[index] /= k;
        }

        best = "";
        search("");
        return best;
    }

    private void search(String candidate) {
        if (
            candidate.length() > best.length() || (candidate.length() == best.length() && candidate.compareTo(best) > 0)
        ) {
            best = candidate;
        }

        for (int index = 25; index >= 0; --index) {
            if (quotas[index] == 0) continue;
            --quotas[index];
            String extended = candidate + (char) ('a' + index);
            if (isRepeated(extended)) {
                search(extended);
            }
            ++quotas[index];
        }
    }

    private boolean isRepeated(String candidate) {
        int matched = 0;
        int completed = 0;
        for (int index = 0; index < source.length(); ++index) {
            if (source.charAt(index) == candidate.charAt(matched)) {
                ++matched;
                if (matched == candidate.length()) {
                    if (++completed == repetitions) return true;
                    matched = 0;
                }
            }
        }
        return false;
    }
}
