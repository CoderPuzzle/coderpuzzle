class Solution {
  public:
    bool isNStraightHand(vector<int> &hand, int groupSize) {
        // A divisible hand must be a multiple of groupSize long.
        if ((int)hand.size() % groupSize != 0) {
            return false;
        }
        map<int, long long> counts;
        for (int v : hand) {
            counts[v]++;
        }
        // begin() is always the smallest remaining value: it must
        // start its groups, since nothing smaller exists to extend
        // downward.
        while (!counts.empty()) {
            auto it = counts.begin();
            int value = it->first;
            long long need = it->second;
            // Each of the next groupSize-1 values must supply at
            // least `need` cards; subtracting in bulk keeps this to
            // one pass per starting value. Erasing exhausted keys
            // keeps begin() the smallest value still held.
            for (int nv = value; nv < value + groupSize; nv++) {
                auto found = counts.find(nv);
                long long have = (found == counts.end()) ? 0 : found->second;
                if (have < need) {
                    return false;
                }
                if (have == need) {
                    counts.erase(nv);
                } else {
                    counts[nv] = have - need;
                }
            }
        }
        return true;
    }
};
