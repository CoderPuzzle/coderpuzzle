class Solution {

    public int depthSum(NestedInteger nestedList) {
        int total = 0;
        for (NestedInteger item : nestedList.getList()) total += walk(item, 1);
        return total;
    }

    private int walk(NestedInteger node, int depth) {
        if (node.isInteger()) return node.getInteger() * depth;
        int total = 0;
        for (NestedInteger child : node.getList()) total += walk(child, depth + 1);
        return total;
    }
}
