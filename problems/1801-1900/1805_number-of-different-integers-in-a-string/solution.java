import java.util.HashSet;
import java.util.Set;

class Solution {

    public int numDifferentIntegers(String word) {
        // A digit run can be up to 1000 digits long, far beyond any
        // fixed-width integer, so runs are never parsed: each is stripped
        // of leading zeros and compared as a string in a hash set. The
        // strip loop keeps one digit, so an all-zero run stays "0".
        Set<String> seen = new HashSet<>();
        int n = word.length();
        int i = 0;
        while (i < n) {
            char c = word.charAt(i);
            if (c < '0' || c > '9') {
                i++;
                continue;
            }
            int j = i;
            while (j < n && word.charAt(j) >= '0' && word.charAt(j) <= '9') {
                j++;
            }
            int k = i;
            while (k + 1 < j && word.charAt(k) == '0') {
                k++;
            }
            seen.add(word.substring(k, j));
            i = j;
        }
        return seen.size();
    }
}
