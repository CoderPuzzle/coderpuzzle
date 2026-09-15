// JSON.parse creates arrays and plain objects whose entries are enumerable
// own properties. Finding the first such property proves the container is
// nonempty; exhausting the enumeration proves it has none.
function isEmpty(obj: JsonContainer): boolean {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

class Solution {
    isEmpty(isEmptyCase: IsEmptyCase): boolean {
        return isEmpty(isEmptyCase.obj);
    }
}
