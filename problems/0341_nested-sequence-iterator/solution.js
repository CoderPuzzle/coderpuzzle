/*
 * This is the interface that allows for creating nested lists.
 * You should not implement it, or speculate about its implementation
 * function NestedInteger() { ... }
 * NestedInteger.prototype.isInteger = function () { ... }
 * NestedInteger.prototype.getInteger = function () { ... }
 * NestedInteger.prototype.setInteger = function (value) { ... }
 * NestedInteger.prototype.add = function (item) { ... }
 * NestedInteger.prototype.getList = function () { ... }
 */

class NestedSequenceIterator {
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

    nextValue() {
        return this.values[this.cursor++];
    }

    hasMore() {
        return this.cursor < this.values.length;
    }
}
