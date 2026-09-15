class Solution {
  public:
    vector<int> distributeCandies(int candies, int num_people) {
        // Hand out one gift per turn, cycling through the row. Each turn the
        // gift grows by one; when fewer candies remain than the next gift,
        // the current person takes what is left and the loop ends.
        vector<int> result(num_people, 0);
        int give = 1;
        for (int index = 0; candies > 0; ++index) {
            int take = min(give, candies);
            result[index % num_people] += take;
            candies -= take;
            ++give;
        }
        return result;
    }
};
