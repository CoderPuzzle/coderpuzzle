class Solution {
  public:
    int maxConsecutive(int bottom, int top, vector<int> &special) {
        sort(special.begin(), special.end());
        int best = max(special.front() - bottom, top - special.back());
        for (size_t i = 1; i < special.size(); i++) {
            best = max(best, special[i] - special[i - 1] - 1);
        }
        return best;
    }
};
