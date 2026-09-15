class Solution {

    // Whole rounds consume sum(chalk); simulate only the remainder.
    public int chalkReplacer(int[] chalk, long k) {
        long total = 0;
        for (int c : chalk) {
            total += c;
        }
        k %= total;
        for (int i = 0; i < chalk.length; i++) {
            if (k < chalk[i]) {
                return i;
            }
            k -= chalk[i];
        }
        return -1; // unreachable: remainder < total
    }
}
