import java.util.Arrays;

class Solution {

    public long dividePlayers(int[] skill) {
        // The team total is fixed: the sum of all skills split evenly over
        // n / 2 teams. If the sum does not divide, no pairing can be even.
        // Otherwise the sorted array forces the weakest and strongest into
        // a team, which the two pointers check and price in one pass.
        int n = skill.length;
        int teams = n / 2;
        int total = 0;
        for (int s : skill) {
            total += s;
        }
        if (total % teams != 0) {
            return -1;
        }
        int target = total / teams;

        Arrays.sort(skill);
        long chemistry = 0;
        int i = 0;
        int j = n - 1;
        while (i < j) {
            if (skill[i] + skill[j] != target) {
                return -1;
            }
            chemistry += (long) skill[i] * skill[j];
            i++;
            j--;
        }
        return chemistry;
    }
}
