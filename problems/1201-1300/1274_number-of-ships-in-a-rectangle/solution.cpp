class Sea;

class Solution {
  public:
    int countShips(Sea &ocean, vector<int> &topRight, vector<int> &bottomLeft) {
        // A split can hand a child an empty rectangle; reject it without
        // spending a query.
        if (bottomLeft[0] > topRight[0] || bottomLeft[1] > topRight[1]) {
            return 0;
        }
        // One query retires the whole subtree when the box is empty water.
        if (!ocean.hasShips(topRight, bottomLeft)) {
            return 0;
        }
        // A single point that answered yes holds exactly one ship.
        if (topRight[0] == bottomLeft[0] && topRight[1] == bottomLeft[1]) {
            return 1;
        }

        int midX = (topRight[0] + bottomLeft[0]) / 2;
        int midY = (topRight[1] + bottomLeft[1]) / 2;
        vector<int> midCorner = {midX, midY};
        vector<int> midTop = {midX, topRight[1]};
        vector<int> leftAbove = {bottomLeft[0], midY + 1};
        vector<int> rightMid = {topRight[0], midY};
        vector<int> rightOfMid = {midX + 1, bottomLeft[1]};
        vector<int> aboveRightOfMid = {midX + 1, midY + 1};
        return (countShips(ocean, midCorner, bottomLeft) + countShips(ocean, midTop, leftAbove) +
                countShips(ocean, rightMid, rightOfMid) + countShips(ocean, topRight, aboveRightOfMid));
    }
};
