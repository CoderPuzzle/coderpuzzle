#include <unordered_set>

class Solution {
  public:
    int flipgame(vector<int> &fronts, vector<int> &backs) {
        // A card printed with the same number on both faces shows that number
        // no matter which way it is flipped, so that number can never be good.
        // Any other printed number can be good: rest one card carrying it with
        // that side down, and every other card — at most one of its two faces
        // carries the number — hides it face down. The flips are independent,
        // so nothing else has to be planned: the answer is the smallest
        // printed number that no both-faces card forces upward.
        unordered_set<int> forced;
        for (int i = 0; i < (int)fronts.size(); ++i) {
            if (fronts[i] == backs[i]) {
                forced.insert(fronts[i]);
            }
        }
        int best = 0;
        for (int value : fronts) {
            if (forced.count(value) == 0 && (best == 0 || value < best)) {
                best = value;
            }
        }
        for (int value : backs) {
            if (forced.count(value) == 0 && (best == 0 || value < best)) {
                best = value;
            }
        }
        return best;
    }
};
