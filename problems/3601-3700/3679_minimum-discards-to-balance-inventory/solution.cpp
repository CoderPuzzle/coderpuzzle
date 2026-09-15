class Solution {
  public:
    int minArrivalsToDiscard(vector<int> &arrivals, int w, int m) {
        // cnt[type] holds how many kept arrivals of that type sit inside the
        // current w-day window; kept[i] records whether day i was kept, since
        // a discarded arrival never entered the counts and must not be
        // decremented when its day slides out of the window.
        unordered_map<int, int> cnt;
        vector<char> kept(arrivals.size(), 0);
        int discards = 0;
        for (int i = 0; i < (int)arrivals.size(); ++i) {
            if (i >= w && kept[i - w]) {
                --cnt[arrivals[i - w]];
            }
            int &count = cnt[arrivals[i]];
            if (count == m) {
                ++discards;
            } else {
                kept[i] = 1;
                ++count;
            }
        }
        return discards;
    }
};
