class Solution {
  public:
    long long maxArea(int height, vector<int> &positions, string directions) {
        // The total moves each second by (#up - #down); that balance only
        // changes at critical times when a piston lands on an end and turns
        // around. Between critical times the total runs along a straight
        // line, so its peak sits at t = 0 or at some critical time.
        map<int, int> events;
        int balance = 0;
        for (int i = 0; i < (int)positions.size(); i++) {
            bool going_up;
            if (positions[i] == 0) {
                going_up = true;
            } else if (positions[i] == height) {
                going_up = false;
            } else {
                going_up = directions[i] == 'U';
            }
            int first = going_up ? height - positions[i] : positions[i];
            if (going_up) {
                // Landing on the top flips a piston downward.
                events[first] -= 2;
                balance++;
                if (first < height) { // second landing stays inside period 2h
                    events[first + height] += 2;
                }
            } else {
                // Landing on the floor flips a piston upward.
                events[first] += 2;
                balance--;
                if (first < height) {
                    events[first + height] -= 2;
                }
            }
        }

        // Totals pass 32 bits near n * height = 10^11; the sweep runs in
        // long long throughout.
        long long total = accumulate(positions.begin(), positions.end(), 0LL);
        long long best = total;
        int prev = 0;
        for (auto [t, delta] : events) {
            total += (long long)balance * (t - prev);
            best = max(best, total);
            balance += delta;
            prev = t;
        }
        return best;
    }
};
