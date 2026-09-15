class Solution {

    public String toGoatLatin(String sentence) {
        // One pass over the words. Each word is reshaped by its first letter
        // alone: a vowel-initial word survives intact, a consonant-initial
        // word rotates its first letter to the end. Every word then takes
        // "ma" plus one more 'a' per its 1-based index, so the i-th word
        // ends in exactly i 'a's. The vowel test is case-blind: 'I' opens
        // the first example as a vowel.
        final String vowels = "aeiouAEIOU";
        StringBuilder out = new StringBuilder();
        String[] words = sentence.split(" ");
        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            char first = word.charAt(0);
            if (vowels.indexOf(first) < 0) {
                word = word.substring(1) + first;
            }
            if (i > 0) {
                out.append(' ');
            }
            out.append(word)
                .append("ma")
                .append("a".repeat(i + 1));
        }
        return out.toString();
    }
}
