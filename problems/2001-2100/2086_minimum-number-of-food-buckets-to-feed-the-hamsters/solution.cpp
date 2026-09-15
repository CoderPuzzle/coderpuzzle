class Solution {
  public:
    int minimumBuckets(string hamsters) {
        int buckets = 0;
        for (int index = 0; index < static_cast<int>(hamsters.size()); index++) {
            if (hamsters[index] != 'H') {
                continue;
            }
            if (index > 0 && hamsters[index - 1] == 'B') {
                continue;
            }
            if (index + 1 < static_cast<int>(hamsters.size()) && hamsters[index + 1] == '.') {
                hamsters[index + 1] = 'B';
                buckets++;
            } else if (index > 0 && hamsters[index - 1] == '.') {
                hamsters[index - 1] = 'B';
                buckets++;
            } else {
                return -1;
            }
        }
        return buckets;
    }
};
