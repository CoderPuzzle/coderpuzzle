#include <cctype>
#include <string>
#include <utility>
#include <vector>

class Solution {
  public:
    string getKthCharacter(vector<string> &root, int k) {
        // Decode the level order: an entry of digits is an internal node,
        // an entry of letters is a leaf, and "" marks an absent child.
        // Only internal nodes occupy child slots, so only they join the
        // queue.
        const int n = static_cast<int>(root.size());
        vector<bool> internal(n, false);
        vector<string> word(n);
        vector<int> left(n, -1), right(n, -1);
        for (int i = 0; i < n; i++) {
            const char c = root[i].empty() ? ' ' : root[i][0];
            internal[i] = isdigit(static_cast<unsigned char>(c)) != 0;
            if (!internal[i]) {
                word[i] = root[i];
            }
        }
        vector<int> queue;
        queue.reserve(n);
        queue.push_back(0);
        int i = 1;
        for (int head = 0; head < static_cast<int>(queue.size()); head++) {
            const int nd = queue[head];
            for (int slot = 0; slot < 2; slot++) {
                if (i >= n) {
                    break;
                }
                const int child = i++;
                if (root[child].empty()) {
                    continue;
                }
                if (slot == 0) {
                    left[nd] = child;
                } else {
                    right[nd] = child;
                }
                if (internal[child]) {
                    queue.push_back(child);
                }
            }
        }
        // total[i] = length of S[i], computed bottom-up with an explicit
        // stack: a leaf contributes word length, an internal node the sum
        // of its children's totals.
        vector<int> total(n, 0);
        vector<pair<int, bool>> order;
        order.push_back({0, false});
        while (!order.empty()) {
            const auto [nd, ready] = order.back();
            order.pop_back();
            if (!internal[nd]) {
                total[nd] = static_cast<int>(word[nd].size());
            } else if (ready) {
                total[nd] = (left[nd] >= 0 ? total[left[nd]] : 0) + (right[nd] >= 0 ? total[right[nd]] : 0);
            } else {
                order.push_back({nd, true});
                if (right[nd] >= 0) {
                    order.push_back({right[nd], false});
                }
                if (left[nd] >= 0) {
                    order.push_back({left[nd], false});
                }
            }
        }
        // Descend without ever building a string: the left subtree owns
        // the first total[left] characters, so k either falls inside it
        // or shifts past it into the right subtree.
        int nd = 0;
        while (internal[nd]) {
            const int leftLen = left[nd] >= 0 ? total[left[nd]] : 0;
            if (k <= leftLen) {
                nd = left[nd];
            } else {
                k -= leftLen;
                nd = right[nd];
            }
        }
        return string(1, word[nd][k - 1]);
    }
};
