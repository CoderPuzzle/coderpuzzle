import java.util.Arrays;

class Solution {

    public boolean checkDistances(String s, int[] distance) {
        // Remember each letter's first index; on the second sighting
        // the letters strictly between number second - first - 1,
        // which must equal that letter's distance entry.
        int[] first = new int[26];
        Arrays.fill(first, -1);
        for (int i = 0; i < s.length(); ++i) {
            int k = s.charAt(i) - 'a';
            if (first[k] < 0) {
                first[k] = i;
            } else if (i - first[k] - 1 != distance[k]) {
                return false;
            }
        }
        return true;
    }
}
