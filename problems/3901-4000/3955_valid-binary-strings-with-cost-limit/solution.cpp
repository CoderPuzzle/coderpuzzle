class Solution {
  public:
    vector<string> generateValidStrings(int n, int k) {
        // Left-to-right backtracking. At index i a '0' is always allowed; a
        // '1' is allowed only when it does not follow another '1' and its
        // index i keeps the running cost <= k. Trying '0' before '1' emits
        // every valid string in lexicographic order. Recursion depth <= 12.
        vector<string> out;
        string current(n, '0');
        build(out, current, n, k, 0, false, 0);
        return out;
    }

  private:
    void build(vector<string> &out, string &current, int n, int k, int index, bool prevOne, int cost) {
        if (index == n) {
            out.push_back(current);
            return;
        }
        build(out, current, n, k, index + 1, false, cost);
        if (!prevOne && cost + index <= k) {
            current[index] = '1';
            build(out, current, n, k, index + 1, true, cost + index);
            current[index] = '0';
        }
    }
};
