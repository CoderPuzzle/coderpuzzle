class Solution {

    public String pushDominoes(String dominoes) {
        int n = dominoes.length();
        // Skip simulation: accumulate signed force. Left to right, an
        // R plants a sentinel force n and an L kills it; the force
        // decays one per step and never drops below zero.
        int[] forces = new int[n];
        int f = 0;
        for (int i = 0; i < n; i++) {
            char c = dominoes.charAt(i);
            if (c == 'R') {
                f = n;
            } else if (c == 'L') {
                f = 0;
            } else {
                f = Math.max(f - 1, 0);
            }
            forces[i] += f;
        }
        // Mirror pass: L plants the force and R blocks it; subtracting
        // leaves the difference between the opposing pushes.
        f = 0;
        for (int i = n - 1; i >= 0; i--) {
            char c = dominoes.charAt(i);
            if (c == 'L') {
                f = n;
            } else if (c == 'R') {
                f = 0;
            } else {
                f = Math.max(f - 1, 0);
            }
            forces[i] -= f;
        }
        // Sign decides: positive falls right, negative left, and zero
        // means the pushes balance — or nothing reached it.
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (forces[i] == 0) {
                sb.append('.');
            } else if (forces[i] > 0) {
                sb.append('R');
            } else {
                sb.append('L');
            }
        }
        return sb.toString();
    }
}
