class Solution {
  public:
    string shiftingLetters(string s, vector<vector<int>> &shifts) {
        int n = s.size();
        // Shifts commute, so only the net shift per position matters.
        // Extra slot at n keeps every end+1 marker in bounds.
        vector<long long> diff(n + 1, 0);
        for (auto &sh : shifts) {
            int delta = sh[2] == 1 ? 1 : -1;
            // +delta at start, -delta just past end: an O(1) range update.
            diff[sh[0]] += delta;
            diff[sh[1] + 1] -= delta;
        }
        string res(n, ' ');
        long long shift = 0;
        for (int i = 0; i < n; i++) {
            // Prefix sum yields the net shift; double % keeps it in [0, 26)
            // even when negative (backward shifts, wrap before 'a').
            shift += diff[i];
            int c = (int)(((s[i] - 'a' + shift) % 26 + 26) % 26);
            res[i] = char('a' + c);
        }
        return res;
    }
};
