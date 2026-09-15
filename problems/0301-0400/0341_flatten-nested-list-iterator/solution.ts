class NestedIterator {
    private values: number[];
    private cursor: number;

    constructor(nestedList: NestedInteger) {
        this.values = [];
        const walk = (item: NestedInteger): void => {
            if (item.isInteger()) {
                this.values.push(item.getInteger());
                return;
            }
            for (const child of item.getList()) walk(child);
        };
        for (const item of nestedList.getList()) walk(item);
        this.cursor = 0;
    }

    next(): number {
        return this.values[this.cursor++];
    }

    hasNext(): boolean {
        return this.cursor < this.values.length;
    }
}
