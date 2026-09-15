class Solution {
  public:
    int minimumRounds(vector<int> &tasks) {
        unordered_map<int, int> counts;
        for (int task : tasks) {
            counts[task]++;
        }
        int rounds = 0;
        for (auto &[level, count] : counts) {
            if (count == 1) {
                return -1;
            }
            rounds += (count + 2) / 3;
        }
        return rounds;
    }
};
