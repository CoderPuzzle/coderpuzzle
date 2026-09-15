class NestedIterator {
    constructor(nestedList) {
        this.values = [];
        const walk = (item) => {
            if (item.isInteger()) {
                this.values.push(item.getInteger());
                return;
            }
            for (const child of item.getList()) walk(child);
        };
        for (const item of nestedList.getList()) walk(item);
        this.cursor = 0;
    }

    next() {
        return this.values[this.cursor++];
    }

    hasNext() {
        return this.cursor < this.values.length;
    }
}
