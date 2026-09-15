/**
 * @param {NestedInteger} nestedList
 * @return {number}
 */
var depthSumInverse = function (nestedList) {
    let level = [...nestedList.getList()];
    let total = 0;
    let flat = 0;
    while (level.length > 0) {
        const nextLevel = [];
        let levelSum = 0;
        for (const node of level) {
            if (node.isInteger()) {
                levelSum += node.getInteger();
            } else {
                nextLevel.push(...node.getList());
            }
        }
        flat += levelSum;
        total += flat;
        level = nextLevel;
    }
    return total;
};
