class Solution {
  public:
    vector<string> findRelativeRanks(vector<int> &score) {
        // Sorting the athletes, not the array: an index list ordered by
        // descending score carries each athlete's placement back to its
        // original slot, so the answer keeps the input's order.
        int n = score.size();
        vector<int> order(n);
        iota(order.begin(), order.end(), 0);
        sort(order.begin(), order.end(), [&](int a, int b) { return score[a] > score[b]; });
        vector<string> medals = {"Gold Medal", "Silver Medal", "Bronze Medal"};
        vector<string> answer(n);
        for (int place = 0; place < n; ++place) {
            answer[order[place]] = place < 3 ? medals[place] : to_string(place + 1);
        }
        return answer;
    }
};
