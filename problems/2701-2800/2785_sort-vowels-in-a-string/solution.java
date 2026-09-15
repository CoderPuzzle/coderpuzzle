import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public String sortVowels(String s) {
        // Consonants never move; only vowel values permute among the vowel
        // slots. Collect the vowels, sort them by ASCII (every uppercase
        // vowel sorts before every lowercase one, e.g. 'O' < 'e'), and pour
        // them back into the vowel slots left to right.
        List<Character> vowels = new ArrayList<>();
        for (int k = 0; k < s.length(); k++) {
            if ("aeiouAEIOU".indexOf(s.charAt(k)) >= 0) {
                vowels.add(s.charAt(k));
            }
        }
        Collections.sort(vowels);
        StringBuilder result = new StringBuilder();
        int i = 0;
        for (int k = 0; k < s.length(); k++) {
            char c = s.charAt(k);
            if ("aeiouAEIOU".indexOf(c) >= 0) {
                result.append(vowels.get(i++));
            } else {
                result.append(c);
            }
        }
        return result.toString();
    }
}
