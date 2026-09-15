/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var zigzagLevelSum = function (root) {
    let frontier = [root];
    const answer = [];
    let odd = true;
    while (frontier.length > 0) {
        let total = 0;
        for (let step = 0; step < frontier.length; step += 1) {
            const index = odd ? step : frontier.length - 1 - step;
            const node = frontier[index];
            const required = odd ? node.left : node.right;
            if (required === null) break;
            total += node.val;
        }
        answer.push(total);
        const next = [];
        for (const node of frontier) {
            if (node.left !== null) next.push(node.left);
            if (node.right !== null) next.push(node.right);
        }
        frontier = next;
        odd = !odd;
    }
    return answer;
};
