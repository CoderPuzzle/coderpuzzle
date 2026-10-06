// NestedInteger holds an integer or a list of NestedInteger (never both);
// the API mirrors LeetCode's JavaScript template.
class NestedInteger {
    constructor(value) {
        this.integer = 0;
        this.holdsInteger = false;
        this.list = [];
        if (typeof value === "number") {
            this.setInteger(value);
        }
    }
    isInteger() {
        return this.holdsInteger;
    }
    getInteger() {
        return this.integer;
    }
    setInteger(value) {
        this.integer = value;
        this.holdsInteger = true;
        this.list = [];
    }
    add(item) {
        this.holdsInteger = false;
        this.list.push(item);
    }
    getList() {
        return this.list;
    }
}
