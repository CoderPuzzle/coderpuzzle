import java.util.Arrays;

class Solution {

    public int numberOfWeakCharacters(int[][] properties) {
        // Attack descending; defense ASCENDING within equal attack so that
        // same-attack characters (who can never weaken each other) only
        // ever meet a running max from strictly higher-attack groups.
        int[][] props = properties.clone();
        Arrays.sort(props, (a, b) -> b[0] != a[0] ? Integer.compare(b[0], a[0]) : Integer.compare(a[1], b[1]));
        int weak = 0;
        // Every earlier character has attack >= the current one's, so the
        // current one is weak exactly when some seen defense is strictly
        // greater -- one running maximum is enough.
        int maxDefense = 0;
        for (int[] p : props) {
            if (p[1] < maxDefense) {
                weak++;
            } else {
                // Raise the max only when not weak, so later (lower-attack)
                // groups compare against it.
                maxDefense = p[1];
            }
        }
        return weak;
    }
}
