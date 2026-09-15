class Solution {

    private int[][] needs;
    private int[] values;
    private int n;
    private int best;

    public int maxScoreWords(String[] words, String[] letters, int[] score) {
        // 26-entry count of the letter pool
        int[] available = new int[26];
        for (String s : letters) {
            available[s.charAt(0) - 'a']++;
        }
        // precompute each word's letter-requirement vector and total score so
        // the recursion works on counts only (n <= 14 makes 2^n fine)
        n = words.length;
        needs = new int[n][];
        values = new int[n];
        for (int i = 0; i < n; i++) {
            int[] need = new int[26];
            int value = 0;
            for (char ch : words[i].toCharArray()) {
                int j = ch - 'a';
                need[j]++;
                value += score[j];
            }
            needs[i] = need;
            values[i] = value;
        }
        best = 0;
        dfs(0, available, 0);
        return best;
    }

    private void dfs(int i, int[] remaining, int total) {
        // every node is already a complete valid selection (the rest can be
        // skipped), so compare best here rather than only at leaves
        if (total > best) best = total;
        if (i == n) return;
        // branch 1: always explore skipping word i
        dfs(i + 1, remaining, total);
        // branch 2: take word i only when the pool covers it; an infeasible
        // word simply prunes that subtree
        int[] need = needs[i];
        boolean ok = true;
        for (int j = 0; j < 26; j++) {
            if (remaining[j] < need[j]) {
                ok = false;
                break;
            }
        }
        if (ok) {
            int[] next = remaining.clone();
            for (int j = 0; j < 26; j++) next[j] -= need[j];
            dfs(i + 1, next, total + values[i]);
        }
    }
}
