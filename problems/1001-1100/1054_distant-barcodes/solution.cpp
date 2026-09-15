class Solution {
  public:
    vector<int> rearrangeBarcodes(vector<int> &barcodes) {
        int n = barcodes.size();
        unordered_map<int, int> counts;
        for (int b : barcodes) {
            counts[b]++;
        }

        vector<int> order;
        for (auto &entry : counts) {
            order.push_back(entry.first);
        }
        sort(order.begin(), order.end(), [&](int a, int c) {
            if (counts[a] != counts[c]) {
                return counts[a] > counts[c];
            }
            return a < c;
        });

        vector<int> result(n, 0);
        int pos = 0;
        for (int value : order) {
            int count = counts[value];
            for (int i = 0; i < count; i++) {
                if (pos >= n) {
                    pos = 1;
                }
                result[pos] = value;
                pos += 2;
            }
        }

        return result;
    }
};
