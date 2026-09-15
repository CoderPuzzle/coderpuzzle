class Solution {
  public:
    vector<int> survivedRobotsHealths(vector<int> &positions, vector<int> &healths, string directions) {
        int n = positions.size();
        vector<int> h(healths.begin(), healths.end());
        vector<int> order(n);
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        sort(order.begin(), order.end(), [&](int a, int b) { return positions[a] < positions[b]; });
        // Sweep left to right; every collision is a right-mover meeting a
        // left-mover face to face, so a stack of sweep survivors is the only
        // state needed. Health changes are written into `h` so survivors
        // keep their decremented values.
        vector<int> stack;
        for (int idx : order) {
            if (directions[idx] == 'R') {
                // Right-movers wait on the stack for someone to hit them.
                stack.push_back(idx);
            } else {
                // A left-mover duels right-movers off the stack top until
                // it dies or the right-movers run out (same-direction robots
                // ahead can never collide with it).
                bool alive = true;
                while (!stack.empty() && directions[stack.back()] == 'R') {
                    int top = stack.back();
                    // Weaker top dies; the incoming robot loses 1 health and
                    // fights on. Stronger top survives at -1; equal kills both.
                    if (h[top] < h[idx]) {
                        h[idx] -= 1;
                        stack.pop_back();
                    } else if (h[top] > h[idx]) {
                        h[top] -= 1;
                        alive = false;
                        break;
                    } else {
                        stack.pop_back();
                        alive = false;
                        break;
                    }
                }
                if (alive) {
                    stack.push_back(idx);
                }
            }
        }
        // Survivors are exactly the stack, but reported in input order.
        vector<bool> survivor(n, false);
        for (int idx : stack) {
            survivor[idx] = true;
        }
        vector<int> result;
        for (int i = 0; i < n; i++) {
            if (survivor[i]) {
                result.push_back(h[i]);
            }
        }
        return result;
    }
};
