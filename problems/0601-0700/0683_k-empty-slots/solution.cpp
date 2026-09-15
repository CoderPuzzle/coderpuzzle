class Solution {
  public:
    int kEmptySlots(vector<int> &bulbs, int k) {
        // Invert to days: days[p] is the turn on which position p lights. A
        // window (i, i+k+1) qualifies exactly when both endpoints light
        // before every interior position, and it qualifies on the day
        // max(days[i], days[i+k+1]); the answer is the minimum such day.
        int n = bulbs.size();
        if (n < k + 2) {
            return -1;
        }
        vector<int> days(n);
        for (int day = 0; day < n; ++day) {
            days[bulbs[day] - 1] = day + 1;
        }
        int best = -1;
        deque<int> window;
        // The interior [right-k, right-1] slides one position at a time; the
        // deque keeps indices of strictly increasing day values, so its front
        // is always the interior minimum.
        for (int index = 1; index < k; ++index) {
            while (!window.empty() && days[window.back()] >= days[index]) {
                window.pop_back();
            }
            window.push_back(index);
        }
        for (int right = k + 1; right < n; ++right) {
            int entering = right - 1;
            while (!window.empty() && days[window.back()] >= days[entering]) {
                window.pop_back();
            }
            window.push_back(entering);
            while (!window.empty() && window.front() < right - k) {
                window.pop_front();
            }
            int pair_day = max(days[right - k - 1], days[right]);
            if ((k == 0 || days[window.front()] > pair_day) && (best == -1 || pair_day < best)) {
                best = pair_day;
            }
        }
        return best;
    }
};
