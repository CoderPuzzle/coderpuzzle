class Solution {

    // Letter values are single decimal digits, so a positional fold
    // (v = v*10 + d) reproduces the concatenated-digit integer.
    public boolean isSumEqual(String firstWord, String secondWord, String targetWord) {
        return val(firstWord) + val(secondWord) == val(targetWord);
    }

    private long val(String w) {
        long v = 0;
        for (int i = 0; i < w.length(); i++) {
            v = v * 10 + (w.charAt(i) - 'a');
        }
        return v;
    }
}
