class Solution {
  public:
    // Simulate with a doubly linked list over the original indices and a
    // min-heap of (sum, left, right). A pair is valid only if its left node
    // is still alive and still points at its recorded right neighbour; stale
    // entries are discarded when popped. A "bad count" of adjacent descents
    // tells us when the array is non-decreasing.
    int minimumPairRemoval(vector<int> &nums) {
        int n = nums.size();
        vector<long long> val(n);
        for (int i = 0; i < n; i++)
            val[i] = nums[i];
        vector<int> prev(n), nxt(n);
        for (int i = 0; i < n; i++) {
            prev[i] = i - 1;
            nxt[i] = i + 1;
        }
        nxt[n - 1] = -1;
        vector<char> alive(n, 1);
        int bad = 0;
        for (int i = 0; i < n - 1; i++)
            if (val[i] > val[nxt[i]])
                bad++;
        if (bad == 0)
            return 0;
        priority_queue<tuple<long long, int, int>, vector<tuple<long long, int, int>>,
                       greater<tuple<long long, int, int>>>
            heap;
        for (int i = 0; i < n - 1; i++)
            heap.emplace(val[i] + val[i + 1], i, i + 1);
        int ops = 0;
        while (bad > 0) {
            auto [s, a, b] = heap.top();
            heap.pop();
            if (!alive[a] || nxt[a] != b || val[a] + val[b] != s)
                continue;
            int pa = prev[a];
            int nb = nxt[b];
            // Folding b into a replaces the three adjacencies (pa,a), (a,b)
            // and (b,nb) with (pa,a) and (a,nb), so adjust bad around them.
            if (pa != -1 && val[pa] > val[a])
                bad--;
            if (val[a] > val[b])
                bad--;
            if (nb != -1 && val[b] > val[nb])
                bad--;
            val[a] += val[b];
            alive[b] = 0;
            nxt[a] = nb;
            if (nb != -1)
                prev[nb] = a;
            if (pa != -1 && val[pa] > val[a])
                bad++;
            if (nb != -1 && val[a] > val[nb])
                bad++;
            ops++;
            if (bad == 0)
                break;
            if (pa != -1)
                heap.emplace(val[pa] + val[a], pa, a);
            if (nb != -1)
                heap.emplace(val[a] + val[nb], a, nb);
        }
        return ops;
    }
};
