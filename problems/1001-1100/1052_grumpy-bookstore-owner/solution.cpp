class Solution {
  public:
    int maxSatisfied(vector<int> &customers, vector<int> &grumpy, int minutes) {
        int base = 0;
        for (int i = 0; i < (int)customers.size(); i++) {
            if (grumpy[i] == 0) {
                base += customers[i];
            }
        }

        int window = 0;
        for (int i = 0; i < minutes; i++) {
            if (grumpy[i] == 1) {
                window += customers[i];
            }
        }
        int best = window;
        for (int i = minutes; i < (int)customers.size(); i++) {
            if (grumpy[i] == 1) {
                window += customers[i];
            }
            if (grumpy[i - minutes] == 1) {
                window -= customers[i - minutes];
            }
            best = max(best, window);
        }

        return base + best;
    }
};
