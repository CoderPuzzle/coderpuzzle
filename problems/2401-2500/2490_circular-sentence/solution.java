class Solution {

    public boolean isCircularSentence(String sentence) {
        // A sentence is circular exactly when every space joins a matching
        // last-to-first pair and the endpoints wrap: sentence.charAt(0) is
        // the first character of the first word and sentence.charAt(n - 1)
        // the last character of the last word. Bail out at the first broken
        // junction.
        for (int i = 0; i < sentence.length(); i++) {
            if (sentence.charAt(i) == ' ' && sentence.charAt(i - 1) != sentence.charAt(i + 1)) {
                return false;
            }
        }
        return sentence.charAt(0) == sentence.charAt(sentence.length() - 1);
    }
}
