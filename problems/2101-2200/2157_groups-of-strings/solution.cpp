class Solution {
  public:
    vector<int> groupStrings(vector<string> &words) {
        unordered_map<int, int> maskCounter;
        for (const auto &w : words) {
            int mask = 0;
            for (char ch : w) {
                mask |= 1 << (ch - 'a');
            }
            maskCounter[mask]++;
        }

        vector<int> masks;
        masks.reserve(maskCounter.size());
        for (const auto &kv : maskCounter) {
            masks.push_back(kv.first);
        }
        unordered_map<int, int> index;
        for (int k = 0; k < (int)masks.size(); k++) {
            index[masks[k]] = k;
        }
        int sz = (int)masks.size();
        vector<int> parent(sz);
        vector<int> sizeCount(sz);
        for (int k = 0; k < sz; k++) {
            parent[k] = k;
            sizeCount[k] = maskCounter[masks[k]];
        }

        auto find = [&](int x) {
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };
        auto unionIdx = [&](int a, int b) {
            int ra = find(a), rb = find(b);
            if (ra != rb) {
                parent[rb] = ra;
                sizeCount[ra] += sizeCount[rb];
            }
        };

        int full = (1 << 26) - 1;
        for (int k = 0; k < sz; k++) {
            int mask = masks[k];
            // Add / delete one letter: masks differing in exactly one bit.
            for (int bit = 0; bit < 26; bit++) {
                int neighbor = mask ^ (1 << bit);
                auto it = index.find(neighbor);
                if (it != index.end()) {
                    unionIdx(k, it->second);
                }
            }
            // Replace one letter: remove a present bit, add an absent bit.
            int absent = full & ~mask;
            int removable = mask;
            while (removable) {
                int low = removable & -removable;
                removable ^= low;
                int base = mask & ~low;
                int addable = absent;
                while (addable) {
                    int low2 = addable & -addable;
                    addable ^= low2;
                    int neighbor = base | low2;
                    auto it = index.find(neighbor);
                    if (it != index.end()) {
                        unionIdx(k, it->second);
                    }
                }
            }
        }

        unordered_set<int> roots;
        for (int k = 0; k < sz; k++) {
            roots.insert(find(k));
        }
        int largest = 0;
        for (int k = 0; k < sz; k++) {
            if (find(k) == k) {
                largest = max(largest, sizeCount[k]);
            }
        }
        return {(int)roots.size(), largest};
    }
};
