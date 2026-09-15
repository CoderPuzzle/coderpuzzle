class Street;

class Solution {
  public:
    int houseCount(Street &street, int k) {
        // Anchor on an open door first; it becomes the round's beacon.
        while (!street.isDoorOpen()) {
            street.moveRight();
        }
        while (true) {
            // Walk right until an open door is sighted. The round-start
            // beacon itself sits at forward distance n <= k, so the walk
            // always sights something within k steps.
            int steps = 0;
            bool sighted = false;
            while (steps < k) {
                street.moveRight();
                steps++;
                if (street.isDoorOpen()) {
                    sighted = true;
                    break;
                }
            }
            // Close the sighted door, then sweep up to k houses hunting
            // for a survivor. An empty sweep proves every door is now
            // closed — possible only when the door just closed was the
            // round-start beacon itself, i.e. the sighting completed a
            // full lap and steps == n.
            street.closeDoor();
            int swept = 0;
            bool survivor = false;
            while (swept < k) {
                street.moveRight();
                swept++;
                if (street.isDoorOpen()) {
                    survivor = true;
                    break;
                }
            }
            if (!survivor) {
                return steps;
            }
        }
    }
};
