class Solution {
  public:
    vector<int> asteroidCollision(vector<int> &asteroids) {
        // The stack holds survivors — internally stable, all collisions resolved.
        vector<int> stack;
        for (int asteroid : asteroids) {
            bool alive = true;
            // A newcomer can only fight the top, and only when it moves left
            // against a right-moving survivor; other pairs never meet.
            while (alive && !stack.empty() && asteroid < 0 && stack.back() > 0) {
                int top = stack.back();
                if (top < -asteroid) {
                    // Top explodes; the newcomer continues against the new top.
                    stack.pop_back();
                } else if (top == -asteroid) {
                    // Equal sizes: both explode.
                    stack.pop_back();
                    alive = false;
                } else {
                    // Top is larger: the newcomer explodes.
                    alive = false;
                }
            }
            if (alive) {
                stack.push_back(asteroid);
            }
        }
        return stack;
    }
};
