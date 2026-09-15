import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] generatePalindromes(String s) {
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); ++i) counts[s.charAt(i) - 'a']++;
        // A palindrome pairs up every letter except at most one middle
        // occupant, so a second odd count means no palindromic arrangement.
        String middle = "";
        for (int i = 0; i < 26; ++i) {
            if (counts[i] % 2 == 1) {
                if (!middle.isEmpty()) return new String[] {};
                middle = String.valueOf((char) ('a' + i));
            }
        }
        // Quota for the left half, one bucket per distinct letter. Choosing
        // buckets rather than positions makes every half distinct by
        // construction — the duplicate branches a naive per-position
        // permutation would explore never arise.
        int[] half = new int[26];
        for (int i = 0; i < 26; ++i) half[i] = counts[i] / 2;
        List<String> results = new ArrayList<>();
        walk(half, s.length() / 2, middle, new StringBuilder(), results);
        return results.toArray(new String[0]);
    }

    private void walk(int[] half, int target, String middle, StringBuilder current, List<String> results) {
        // Half complete: mirror it around the odd letter, if there is one.
        if (current.length() == target) {
            String left = current.toString();
            results.add(left + middle + new StringBuilder(left).reverse());
            return;
        }
        // Letters ascend, so earlier positions vary slowest and the
        // palindromes come out in ascending lexicographic order.
        for (int i = 0; i < 26; ++i) {
            if (half[i] == 0) continue;
            half[i]--;
            current.append((char) ('a' + i));
            walk(half, target, middle, current, results);
            current.deleteCharAt(current.length() - 1);
            half[i]++;
        }
    }
}
