class Solution {
  public:
    int maxChunksToSorted(vector<int> &arr) {
        // A boundary is legal exactly when the multiset of arr's prefix
        // equals the sorted copy's prefix — values repeat, so multisets,
        // not max/min ranges, decide.
        vector<int> ordered(arr);
        sort(ordered.begin(), ordered.end());
        unordered_map<int, int> counts;
        int balance = 0;
        int chunks = 0;
        for (size_t i = 0; i < arr.size(); i++) {
            int a = arr[i], b = ordered[i];
            // Each update adds +1 when it leaves a count nonzero (a new
            // unpaired element) and -1 when it brings one back to zero.
            balance += ++counts[a] > 0 ? 1 : -1;
            balance += --counts[b] < 0 ? 1 : -1;
            // Zero balance = no unpaired elements: the prefix multisets
            // agree, so cut a chunk at the earliest such index.
            if (balance == 0)
                chunks++;
        }
        return chunks;
    }
};
