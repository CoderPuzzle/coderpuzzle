/*
 * This is the interface that allows for creating nested lists.
 * You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *     isInteger(): boolean
 *     getInteger(): number | null
 *     setInteger(value: number): void
 *     add(item: NestedInteger): void
 *     getList(): NestedInteger[]
 * }
 */

class NestedSequenceIterator {
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

    nextValue(): number {
        return this.values[this.cursor++];
    }

    hasMore(): boolean {
        return this.cursor < this.values.length;
    }
}
