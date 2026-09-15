class Solution {

    public String smallestBeautifulString(String s, int k) {
        // A string avoids every palindromic substring iff it avoids the short
        // ones: any longer palindrome contains a length-2 or length-3 one at
        // its center (hint 1). So a character is safe exactly when it differs
        // from both of the two characters before it — only those could build
        // a forbidden palindrome ending here.
        char limit = (char) ('a' + k);
        char[] chars = s.toCharArray();
        int pivot = -1;
        // Walk right to left and bump the first position that accepts a larger
        // safe letter; leaving earlier positions untouched keeps the result
        // minimal, since any smaller answer must agree with s even further.
        for (int i = chars.length - 1; i >= 0 && pivot == -1; i--) {
            for (char cand = (char) (s.charAt(i) + 1); cand < limit; cand++) {
                if ((i < 1 || chars[i - 1] != cand) && (i < 2 || chars[i - 2] != cand)) {
                    chars[i] = cand;
                    pivot = i;
                    break;
                }
            }
        }
        if (pivot == -1) {
            return "";
        }
        // Rebuild everything after the pivot with the smallest safe letter,
        // which repeats as soon as blocking distance passes ("abcabc...").
        for (int j = pivot + 1; j < chars.length; j++) {
            for (char cand = 'a'; cand < limit; cand++) {
                if ((j < 1 || chars[j - 1] != cand) && (j < 2 || chars[j - 2] != cand)) {
                    chars[j] = cand;
                    break;
                }
            }
        }
        return new String(chars);
    }
}
