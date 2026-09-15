class Solution {
  public:
    vector<int> relocateMarbles(vector<int> &nums, vector<int> &moveFrom, vector<int> &moveTo) {
        // Only occupancy matters: a move relocates every marble sitting on a
        // position at once, so one set of occupied positions tracks the state.
        unordered_set<int> occupied(nums.begin(), nums.end());
        // In order: vacate the source, occupy the target. A self-move erases
        // and re-inserts the same position; merging into an occupied target
        // is just a set insert.
        for (size_t step = 0; step < moveFrom.size(); ++step) {
            occupied.erase(moveFrom[step]);
            occupied.insert(moveTo[step]);
        }
        vector<int> answer(occupied.begin(), occupied.end());
        sort(answer.begin(), answer.end());
        return answer;
    }
};
