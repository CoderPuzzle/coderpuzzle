#include <queue>
#include <vector>

class Solution {
  public:
    long long maxCandies(vector<int> &status, vector<int> &candies, vector<vector<int>> &keys,
                         vector<vector<int>> &containedBoxes, vector<int> &initialBoxes) {
        // Two waiting rooms: owned-but-locked boxes, and the openable queue.
        int n = status.size();
        vector<bool> lockedHeld(n, false);
        vector<bool> opened(n, false);
        long long total = 0;
        queue<int> pending;

        for (int b : initialBoxes)
            acquire(b, status, opened, lockedHeld, pending);

        while (!pending.empty()) {
            int b = pending.front();
            pending.pop();
            if (opened[b])
                continue;
            opened[b] = true;
            total += candies[b];
            for (int k : keys[b]) {
                status[k] = 1;
                if (lockedHeld[k]) {
                    // The key only matters for a box already owned and
                    // parked; release it into the queue once it unlocks.
                    lockedHeld[k] = false;
                    pending.push(k);
                }
            }
            for (int c : containedBoxes[b]) {
                acquire(c, status, opened, lockedHeld, pending);
            }
        }
        return total;
    }

  private:
    void acquire(int box, vector<int> &status, vector<bool> &opened, vector<bool> &lockedHeld, queue<int> &pending) {
        // Ownership event: an initial box, or one found inside another.
        if (opened[box] || lockedHeld[box])
            return;
        if (status[box] == 1) {
            pending.push(box);
        } else {
            lockedHeld[box] = true;
        }
    }
};
