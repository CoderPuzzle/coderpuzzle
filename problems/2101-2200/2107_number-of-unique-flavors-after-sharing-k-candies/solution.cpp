class Solution {
  public:
    int shareCandies(vector<int> &candies, int k) {
        unordered_map<int, int> counts;
        for (int flavor : candies) {
            ++counts[flavor];
        }
        int distinct = static_cast<int>(counts.size());
        for (int index = 0; index < k; ++index) {
            if (--counts[candies[index]] == 0) {
                --distinct;
            }
        }

        int answer = distinct;
        for (int right = k; right < static_cast<int>(candies.size()); ++right) {
            int restored = candies[right - k];
            if (counts[restored]++ == 0) {
                ++distinct;
            }
            int removed = candies[right];
            if (--counts[removed] == 0) {
                --distinct;
            }
            answer = max(answer, distinct);
        }
        return answer;
    }
};
