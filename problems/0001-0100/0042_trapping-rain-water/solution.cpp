class Solution {
  public:
    int trap(vector<int> &height) {
        // Water above bar i is min(tallest to its left, tallest to its right)
        // minus height[i]; two converging pointers derive both maxima on the
        // fly instead of precomputing two running-max arrays.
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        // left < right retires one index per step and never processes the
        // meeting index twice (the global maximum traps nothing anyway).
        while (left < right) {
            // Process the smaller side: the right side holds a bar at least
            // height[right] tall, hence taller than height[left], so the water
            // at left is decided entirely by leftMax.
            if (height[left] < height[right]) {
                // A bar that sets a new leftMax traps nothing; below it, the
                // trapped depth is exactly leftMax - height[left].
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                // Symmetric argument on the right side.
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        return water;
    }
};
