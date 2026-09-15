class Solution {

    // The trailing digit is the 1-indexed slot; drop each word into its slot
    // and rejoin.
    public String sortSentence(String s) {
        String[] words = s.split(" ");
        String[] out = new String[words.length];
        for (String w : words) {
            out[w.charAt(w.length() - 1) - '1'] = w.substring(0, w.length() - 1);
        }
        return String.join(" ", out);
    }
}
