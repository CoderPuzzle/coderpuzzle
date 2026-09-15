class Solution {
  public:
    vector<string> validStrings(int n) {
        // A valid string never contains "00", so the choice at each position
        // depends only on the previous character: after a 0 the next char is
        // forced to be 1, after a 1 either character may follow. Appending 0
        // right after a 0 is the only move that can ever go wrong, so pruning
        // exactly that branch keeps every surviving path valid. Trying 0
        // before 1 makes the depth-first walk emit the strings already in
        // ascending lexicographic order — no final sort needed.
        string current;
        vector<string> results;
        backtrack(n, current, results);
        return results;
    }

  private:
    void backtrack(int n, string &current, vector<string> &results) {
        if ((int)current.size() == n) {
            results.push_back(current);
            return;
        }
        for (char ch : {'0', '1'}) {
            if (ch == '0' && !current.empty() && current.back() == '0')
                continue; // would create "00" — prune this branch
            current.push_back(ch);
            backtrack(n, current, results);
            current.pop_back();
        }
    }
};
