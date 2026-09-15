class Solution {
  public:
    // Every value n takes must be non-prime and keeps exactly len(n)
    // digits — decrementing a leading 1 is not a legal op — so the
    // states form a tiny graph: fewer than 1e4 nodes, at most 8
    // single-digit +-1 moves each. Dijkstra with the destination value
    // as the edge weight and the start value as the initial cost sums
    // every value n takes, original included (the example path
    // 10 -> 20 -> 21 -> 22 -> 12 costs 10+20+21+22+12 = 85). Each
    // state contributes its value at most once and weights are < 1e4,
    // so costs stay under 1e8 — safely inside 32-bit range.
    int minOperations(int n, int m) {
        const int LIMIT = 10000;
        vector<bool> isComp(LIMIT, false);
        for (int i = 2; i < LIMIT; ++i) {
            if (!isComp[i]) {
                for (long long j = 1LL * i * i; j < LIMIT; j += i) {
                    isComp[static_cast<int>(j)] = true;
                }
            }
        }
        if (isPrime(n, isComp) || isPrime(m, isComp))
            return -1;
        int top = 1;
        for (int w = static_cast<int>(to_string(n).size()); w > 1; --w)
            top *= 10;
        vector<int> dist(LIMIT, -1);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> heap;
        dist[n] = n;
        heap.push({n, n});
        while (!heap.empty()) {
            auto [d, u] = heap.top();
            heap.pop();
            if (d > dist[u])
                continue;
            if (u == m)
                return d;
            for (int p = top; p >= 1; p /= 10) {
                int digit = (u / p) % 10;
                auto relax = [&](int y) {
                    if (isPrime(y, isComp) || (dist[y] >= 0 && dist[y] <= d + y))
                        return;
                    dist[y] = d + y;
                    heap.push({d + y, y});
                };
                if (digit < 9)
                    relax(u + p);
                if (digit > 0 && !(p == top && digit == 1))
                    relax(u - p);
            }
        }
        return -1;
    }

    bool isPrime(int v, const vector<bool> &isComp) { return v >= 2 && !isComp[v]; }
};
