class Solution {
    findSolution(customfunction: CustomFunction, z: number): number[][] {
        const pairs: number[][] = [];
        let x = 1;
        let y = 1000;
        while (x <= 1000 && y >= 1) {
            const value = customfunction.f(x, y);
            if (value === z) {
                pairs.push([x, y]);
                x++;
                y--;
            } else if (value < z) {
                x++;
            } else {
                y--;
            }
        }
        return pairs;
    }
}
