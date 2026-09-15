class Solution {

    // Each index executes at most once, so a linear walk with a visited
    // flag per index suffices: "add" contributes values[i] and steps to
    // i + 1, "jump" moves to i + values[i], and the process ends on any
    // out-of-bounds target or on an already-executed target (which is not
    // executed again). The score is 64-bit: with n up to 1e5 adds of
    // magnitude up to 1e5, |score| can reach 1e10.
    public long calculateScore(String[] instructions, int[] values) {
        int n = instructions.length;
        boolean[] executed = new boolean[n];
        long score = 0;
        int i = 0;
        while (0 <= i && i < n && !executed[i]) {
            executed[i] = true;
            if (instructions[i].equals("add")) {
                score += values[i];
                i += 1;
            } else {
                i += values[i];
            }
        }
        return score;
    }
}
