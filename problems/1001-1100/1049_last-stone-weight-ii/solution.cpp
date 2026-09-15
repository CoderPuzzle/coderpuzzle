class Solution {
  public:
    int lastStoneWeightII(vector<int> &stones) {
        // Smash order is irrelevant: the last stone is a signed sum, so the
        // task is a two-group partition minimizing the difference of sums.
        int total = 0;
        for (int s : stones) {
            total += s;
        }
        // With group A + group B = total fixed, minimizing total - 2*sum(A)
        // means pushing sum(A) as close to total/2 as possible.
        int target = total / 2;
        vector<bool> reachable(target + 1, false);
        reachable[0] = true;
        for (int value : stones) {
            // Descend so a stone can't be counted twice in the same sum.
            for (int s = target; s >= value; s--) {
                if (reachable[s - value]) {
                    reachable[s] = true;
                }
            }
        }
        // Largest reachable subset sum at most target.
        int best = 0;
        for (int s = target; s >= 0; s--) {
            if (reachable[s]) {
                best = s;
                break;
            }
        }
        return total - 2 * best;
    }
};
