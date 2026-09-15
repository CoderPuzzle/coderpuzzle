class Solution {
  public:
    vector<bool> palindromePath(int n, vector<vector<int>> &edges, string s, vector<string> &queries) {
        // Adjacency as flat per-node arrays: two passes over the edge list.
        vector<int> degree(n, 0);
        for (const auto &edge : edges) {
            ++degree[edge[0]];
            ++degree[edge[1]];
        }
        vector<vector<int>> adjacency(n);
        for (int node = 0; node < n; ++node) {
            adjacency[node].reserve(degree[node]);
        }
        for (const auto &edge : edges) {
            adjacency[edge[0]].push_back(edge[1]);
            adjacency[edge[1]].push_back(edge[0]);
        }

        // One iterative depth-first search from node 0 fills every static
        // structure: depth, entry/exit stamps tin/tout over 2n tick
        // positions, and the Euler walk (node on entry and after every
        // child) that the sparse table compresses. The explicit stack keeps
        // a 10^4-deep path off the call stack.
        vector<int> depth(n, 0);
        vector<int> tin(n, 0);
        vector<int> tout(n, 0);
        vector<int> first(n, 0);
        vector<int> walk(2 * n - 1, 0);
        vector<int> cursor(n, 0);
        vector<char> seen(n, 0);
        int clock = 0;
        int walkLength = 0;
        vector<int> stack;
        stack.reserve(n);
        seen[0] = 1;
        tin[0] = clock++;
        first[0] = walkLength;
        walk[walkLength++] = 0;
        stack.push_back(0);
        while (!stack.empty()) {
            int node = stack.back();
            if (cursor[node] < (int)adjacency[node].size()) {
                int child = adjacency[node][cursor[node]++];
                if (!seen[child]) {
                    seen[child] = 1;
                    depth[child] = depth[node] + 1;
                    tin[child] = clock++;
                    first[child] = walkLength;
                    walk[walkLength++] = child;
                    stack.push_back(child);
                }
            } else {
                stack.pop_back();
                tout[node] = clock++;
                if (!stack.empty()) {
                    walk[walkLength++] = stack.back();
                }
            }
        }

        // Only letter parities matter, so each node carries a 26-bit mask
        // and path masks combine by XOR. The path mask of u..v is
        // rootMask(u) ^ rootMask(v) ^ letter(lca): the common ancestors
        // cancel between the two root paths, so the LCA's letter returns.
        // rootMask(x) is the XOR of every delta whose node is an
        // ancestor-or-equal of x; on tick positions those are exactly the
        // intervals [tin, tout] containing tin[x], so flipping each delta
        // at tin and tout + 2 makes rootMask(x) a prefix XOR read at
        // tin[x] + 1 — non-ancestor subtrees contribute both flips and
        // cancel. A Fenwick tree over the 2n positions serves reads/flips.
        int size = 2 * n;
        vector<char> letters(s.begin(), s.end());
        vector<int> deltaAt(size + 1, 0);
        for (int node = 0; node < n; ++node) {
            int bit = 1 << (letters[node] - 'a');
            deltaAt[tin[node] + 1] ^= bit;
            int closing = tout[node] + 2;
            if (closing <= size) {
                deltaAt[closing] ^= bit;
            }
        }
        vector<int> tree(size + 1, 0);
        vector<int> prefix(size + 1, 0);
        int running = 0;
        for (int position = 1; position <= size; ++position) {
            running ^= deltaAt[position];
            prefix[position] = running;
        }
        for (int position = 1; position <= size; ++position) {
            int low = position & -position;
            tree[position] = prefix[position] ^ prefix[position - low];
        }

        // Sparse table over the Euler walk: packing (depth << 17) | node
        // makes a plain long long minimum return the shallowest node of
        // any walk range, which is the LCA. depth and node stay under 2^17,
        // but the packed key passes 2^32, hence the 64-bit widening.
        int levels = 1;
        while ((1 << levels) <= walkLength) {
            ++levels;
        }
        vector<vector<long long>> table(levels);
        table[0].resize(walkLength);
        for (int index = 0; index < walkLength; ++index) {
            table[0][index] = ((long long)depth[walk[index]] << 17) | walk[index];
        }
        for (int level = 1; level < levels; ++level) {
            int half = 1 << (level - 1);
            const vector<long long> &previous = table[level - 1];
            int length = walkLength - (1 << level) + 1;
            vector<long long> &current = table[level];
            current.resize(length);
            for (int index = 0; index < length; ++index) {
                current[index] = min(previous[index], previous[index + half]);
            }
        }
        vector<int> log2(walkLength + 1, 0);
        for (int index = 2; index <= walkLength; ++index) {
            log2[index] = log2[index >> 1] + 1;
        }

        vector<bool> answer;
        answer.reserve(queries.size());
        for (const string &query : queries) {
            size_t space1 = query.find(' ');
            size_t space2 = query.find(' ', space1 + 1);
            if (query[0] == 'u') {
                int node = stoi(query.substr(space1 + 1, space2 - space1 - 1));
                char letter = query[space2 + 1];
                int delta = (1 << (letters[node] - 'a')) ^ (1 << (letter - 'a'));
                if (delta != 0) {
                    letters[node] = letter;
                    for (int position = tin[node] + 1; position <= size; position += position & -position) {
                        tree[position] ^= delta;
                    }
                    int closing = tout[node] + 2;
                    if (closing <= size) {
                        for (int position = closing; position <= size; position += position & -position) {
                            tree[position] ^= delta;
                        }
                    }
                }
            } else {
                int u = stoi(query.substr(space1 + 1, space2 - space1 - 1));
                int v = stoi(query.substr(space2 + 1));
                int left = first[u];
                int right = first[v];
                if (left > right) {
                    swap(left, right);
                }
                int power = log2[right - left + 1];
                long long best = table[power][left];
                long long other = table[power][right - (1 << power) + 1];
                if (other < best) {
                    best = other;
                }
                int top = (int)(best & 131071);
                int mask = 0;
                for (int position = tin[u] + 1; position > 0; position -= position & -position) {
                    mask ^= tree[position];
                }
                for (int position = tin[v] + 1; position > 0; position -= position & -position) {
                    mask ^= tree[position];
                }
                mask ^= 1 << (letters[top] - 'a');
                // At most one set bit <=> the mask is 0 or a power of two.
                answer.push_back(mask == 0 || (mask & (mask - 1)) == 0);
            }
        }
        return answer;
    }
};
