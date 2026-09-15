class Solution {
  public:
    vector<int> minReverseOperations(int n, int p, vector<int> &banned, int k) {
        vector<int> answer(n, -1);
        vector<vector<int>> parent(2);
        for (int parity = 0; parity < 2; parity++) {
            parent[parity].resize((n + 1 - parity) / 2 + 1);
            for (int i = 0; i < (int)parent[parity].size(); i++)
                parent[parity][i] = i;
        }
        auto first = [&](int parity, int pos) {
            vector<int> &par = parent[parity];
            while (par[pos] != pos)
                pos = par[pos] = par[par[pos]];
            return pos;
        };
        auto consume = [&](int position) {
            int slot = position >> 1;
            parent[position & 1][slot] = slot + 1;
        };
        consume(p);
        for (int b : banned)
            consume(b);
        vector<int> queue;
        queue.reserve(n);
        queue.push_back(p);
        answer[p] = 0;
        for (int head = 0; head < (int)queue.size(); head++) {
            int x = queue[head];
            int left = max(0, x - k + 1), right = min(x, n - k);
            if (left > right)
                continue;
            int lo = 2 * left + k - 1 - x, hi = 2 * right + k - 1 - x;
            int parity = lo & 1;
            int limit = (int)parent[parity].size() - 1;
            for (int slot = first(parity, lo >> 1); slot < limit && 2 * slot + parity <= hi;) {
                int y = 2 * slot + parity;
                answer[y] = answer[x] + 1;
                queue.push_back(y);
                parent[parity][slot] = slot + 1;
                slot = first(parity, slot + 1);
            }
        }
        return answer;
    }
};
