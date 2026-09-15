function depthSum(nestedList: NestedInteger): number {
    const walk = (item: NestedInteger, depth: number): number => {
        if (item.isInteger()) return item.getInteger() * depth;
        let total = 0;
        for (const child of item.getList()) total += walk(child, depth + 1);
        return total;
    };
    let total = 0;
    for (const item of nestedList.getList()) total += walk(item, 1);
    return total;
}
