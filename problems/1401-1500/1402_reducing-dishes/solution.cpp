class Solution {
  public:
    int maxSatisfaction(vector<int> &satisfaction) {
        // Sort ascending; the chosen set is a suffix of this order. Adding
        // a new value at the front shifts every chosen dish one slot later
        // (gaining running_sum) and contributes value * 1 for its own slot,
        // so the net change is value + running_sum.
        sort(satisfaction.begin(), satisfaction.end());
        int total = 0;
        int running_sum = 0;
        for (int i = static_cast<int>(satisfaction.size()) - 1; i >= 0; --i) {
            if (running_sum + satisfaction[i] > 0) {
                running_sum += satisfaction[i];
                total += running_sum;
            }
        }
        return total;
    }
};
