class Solution {
  public:
    vector<vector<int>> findWinners(vector<vector<int>> &matches) {
        unordered_map<int, int> losses;
        for (const auto &match : matches) {
            losses.emplace(match[0], 0);
            losses[match[1]]++;
        }
        vector<int> never_lost;
        vector<int> lost_once;
        for (const auto &[player, count] : losses) {
            if (count == 0) {
                never_lost.push_back(player);
            } else if (count == 1) {
                lost_once.push_back(player);
            }
        }
        sort(never_lost.begin(), never_lost.end());
        sort(lost_once.begin(), lost_once.end());
        return {never_lost, lost_once};
    }
};
