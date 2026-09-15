function buildArray(target: number[], n: number): string[] {
    const wanted = new Set(target);
    const last = target[target.length - 1];
    const operations: string[] = [];
    for (let value = 1; value <= last; value++) {
        operations.push("Push");
        if (!wanted.has(value)) {
            operations.push("Pop");
        }
    }
    return operations;
}
