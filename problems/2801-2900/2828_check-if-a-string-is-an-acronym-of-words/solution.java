class Solution {

    public boolean isAcronym(String[] words, String s) {
        // Collect the first character of every word, append them in order,
        // and compare the built acronym with s. String equality reports
        // false for a different length exactly as it does for any
        // mismatched character.
        StringBuilder acronym = new StringBuilder();
        for (String word : words) {
            acronym.append(word.charAt(0));
        }
        return acronym.toString().equals(s);
    }
}
