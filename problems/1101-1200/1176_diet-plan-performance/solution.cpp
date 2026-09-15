class Solution {
  public:
    int dietPlanPerformance(vector<int> &calories, int k, int lower, int upper) {
        long long points = 0;
        // Sum the first window once; every later window shares k-1 days
        // with its predecessor.
        long long window = 0;
        for (int i = 0; i < k; i++) {
            window += calories[i];
        }
        points += score(window, lower, upper);
        for (int i = k; i < (int)calories.size(); i++) {
            window += calories[i] - calories[i - k];
            points += score(window, lower, upper);
        }
        return (int)points;
    }

  private:
    int score(long long total, int lower, int upper) {
        if (total < lower) {
            return -1;
        }
        if (total > upper) {
            return 1;
        }
        return 0;
    }
};
