class Solution {
  public:
    string pushDominoes(string dominoes) {
        int n = dominoes.size();
        // Skip simulation: accumulate signed force. Left to right, an
        // R plants a sentinel force n and an L kills it; the force
        // decays one per step and never drops below zero.
        vector<long long> forces(n, 0);
        long long f = 0;
        for (int i = 0; i < n; i++) {
            if (dominoes[i] == 'R') {
                f = n;
            } else if (dominoes[i] == 'L') {
                f = 0;
            } else {
                f = max(f - 1, 0LL);
            }
            forces[i] += f;
        }
        // Mirror pass: L plants the force and R blocks it; subtracting
        // leaves the difference between the opposing pushes.
        f = 0;
        for (int i = n - 1; i >= 0; i--) {
            if (dominoes[i] == 'L') {
                f = n;
            } else if (dominoes[i] == 'R') {
                f = 0;
            } else {
                f = max(f - 1, 0LL);
            }
            forces[i] -= f;
        }
        // Sign decides: positive falls right, negative left, and zero
        // means the pushes balance — or nothing reached it.
        string res(n, '.');
        for (int i = 0; i < n; i++) {
            if (forces[i] > 0)
                res[i] = 'R';
            else if (forces[i] < 0)
                res[i] = 'L';
        }
        return res;
    }
};
