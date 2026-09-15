import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class Solution {

    public int numSpecialEquivGroups(String[] words) {
        // Swaps never mix parities: even-indexed letters only trade with
        // even-indexed ones, odd with odd, so a word is exactly its two
        // sorted halves. The set counts distinct (even, odd) signatures.
        Set<String> seen = new HashSet<>();
        for (String word : words) {
            char[] even = new char[(word.length() + 1) / 2];
            char[] odd = new char[word.length() / 2];
            for (int i = 0; i < word.length(); ++i) {
                if (i % 2 == 0) {
                    even[i / 2] = word.charAt(i);
                } else {
                    odd[i / 2] = word.charAt(i);
                }
            }
            Arrays.sort(even);
            Arrays.sort(odd);
            seen.add(new String(even) + "#" + new String(odd));
        }
        return seen.size();
    }
}
