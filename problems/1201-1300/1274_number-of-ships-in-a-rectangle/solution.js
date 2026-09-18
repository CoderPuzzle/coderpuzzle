class Solution {
    countShips(ocean, topRight, bottomLeft) {
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
        if (topRight[0] === bottomLeft[0] && topRight[1] === bottomLeft[1]) {
            return 1;
        }
        const midX = Math.floor((topRight[0] + bottomLeft[0]) / 2);
        const midY = Math.floor((topRight[1] + bottomLeft[1]) / 2);
        return (
            this.countShips(ocean, [midX, midY], bottomLeft) +
            this.countShips(ocean, [midX, topRight[1]], [bottomLeft[0], midY + 1]) +
            this.countShips(ocean, [topRight[0], midY], [midX + 1, bottomLeft[1]]) +
            this.countShips(ocean, topRight, [midX + 1, midY + 1])
        );
    }
}
