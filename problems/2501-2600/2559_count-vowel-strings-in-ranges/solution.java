import java.util.Arrays;

class Solution {

    public int[] vowelStrings(String[] words, int[][] queries) {
        // Prefix sums over the vowel-string marks: prefix[i+1] counts
        // the strings among words[0..i] that start and end with a vowel,
        // so a query [l, r] costs one subtraction. Counts stay below
        // words length <= 10^5, well inside 32 bits.
        String vowels = "aeiou";
        int[] prefix = new int[words.length + 1];
        for (int i = 0; i < words.length; ++i) {
            String w = words[i];
            prefix[i + 1] =
                prefix[i] + (vowels.indexOf(w.charAt(0)) >= 0 && vowels.indexOf(w.charAt(w.length() - 1)) >= 0 ? 1 : 0);
        }
        int[] ans = new int[queries.length];
        for (int i = 0; i < queries.length; ++i) {
            ans[i] = prefix[queries[i][1] + 1] - prefix[queries[i][0]];
        }
        return ans;
    }
}
