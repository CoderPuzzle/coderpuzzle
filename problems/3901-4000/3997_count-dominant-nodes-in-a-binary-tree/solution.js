var countDominantNodes = function (root) {
    function go(n) {
        if (!n) return [-1, 0];
        const [a, x] = go(n.left),
            [b, y] = go(n.right),
            m = Math.max(n.val, a, b);
        return [m, x + y + (n.val === m)];
    }
    return go(root)[1];
};
