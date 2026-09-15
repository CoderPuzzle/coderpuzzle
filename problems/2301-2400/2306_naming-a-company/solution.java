import java.util.HashSet;

class Solution {

    // Suffixes (name minus first letter) grouped by first letter; within a
    // group every suffix is unique because all names are unique. A swap
    // between letters a and b survives exactly when neither suffix already
    // exists in the other letter's group; inclusion-exclusion turns that
    // count into sizes minus the shared overlap. The answer can reach
    // ~n^2 = 2.5 * 10^9, past int range, so every accumulator stays long.
    public long distinctNames(String[] ideas) {
        HashSet<String>[] suffixes = new HashSet[26];
        for (int i = 0; i < 26; i++) {
            suffixes[i] = new HashSet<>();
        }
        for (String idea : ideas) {
            suffixes[idea.charAt(0) - 'a'].add(idea.substring(1));
        }
        long total = 0;
        for (int a = 0; a < 26; a++) {
            for (int b = a + 1; b < 26; b++) {
                long shared = 0;
                for (String suffix : suffixes[a]) {
                    if (suffixes[b].contains(suffix)) {
                        shared++;
                    }
                }
                long sizeA = suffixes[a].size();
                long sizeB = suffixes[b].size();
                total += 2 * (sizeA - shared) * (sizeB - shared);
            }
        }
        return total;
    }
}
