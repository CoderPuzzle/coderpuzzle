class Solution {
  public:
    vector<int> numMovesStonesII(vector<int> &stones) {
        sort(stones.begin(), stones.end());
        int n = stones.size();
        if (stones[n - 1] - stones[0] == n - 1) {
            // Already n consecutive integers: no legal move exists.
            return {0, 0};
        }

        // Maximum: play it out from whichever side wastes fewer stones.
        // Losing the low side (never touching it) wastes stones[1] - stones[0]
        // of already-occupied span; losing the high side wastes
        // stones[n-1] - stones[n-2]. Take the larger resulting move count.
        int maxMoves = max(stones[n - 1] - stones[1] - (n - 2), stones[n - 2] - stones[0] - (n - 2));

        // Minimum: slide a window of n consecutive integer values across the
        // sorted positions; a window already holding k stones needs n - k
        // moves to fill the rest.
        int minMoves = n;
        int left = 0;
        for (int right = 0; right < n; right++) {
            while (stones[right] - stones[left] + 1 > n) {
                left++;
            }
            int alreadyPlaced = right - left + 1;
            int cost = n - alreadyPlaced;
            if (cost == 1 && alreadyPlaced == n - 1 && stones[right] - stones[left] == n - 2) {
                // Classic gotcha: n - 1 stones already packed with zero
                // gaps. The lone outside stone can't jump straight into
                // the missing slot without still being an endpoint, so it
                // needs a throwaway hop first -- 2 moves, not 1.
                cost = 2;
            }
            minMoves = min(minMoves, cost);
        }

        return {minMoves, maxMoves};
    }
};
