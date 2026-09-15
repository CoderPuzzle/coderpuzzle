import java.util.ArrayList;
import java.util.List;

class Solution {

    // The shorter word list must be covered by a common prefix plus a
    // common suffix of the longer one; whatever sits between them is
    // the inserted sentence.
    public boolean areSentencesSimilar(String sentence1, String sentence2) {
        List<String> w1 = splitWords(sentence1);
        List<String> w2 = splitWords(sentence2);
        int i = 0;
        while (i < w1.size() && i < w2.size() && w1.get(i).equals(w2.get(i))) {
            i++;
        }
        int j = 0;
        while (j < w1.size() - i && j < w2.size() - i && w1.get(w1.size() - 1 - j).equals(w2.get(w2.size() - 1 - j))) {
            j++;
        }
        return i + j >= Math.min(w1.size(), w2.size());
    }

    private List<String> splitWords(String sentence) {
        List<String> words = new ArrayList<>();
        int start = 0;
        for (int k = 0; k <= sentence.length(); k++) {
            if (k == sentence.length() || sentence.charAt(k) == ' ') {
                words.add(sentence.substring(start, k));
                start = k + 1;
            }
        }
        return words;
    }
}
