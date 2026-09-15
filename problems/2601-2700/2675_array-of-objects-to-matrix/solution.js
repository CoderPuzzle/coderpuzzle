// Every leaf of every element is found with an explicit LIFO worklist of
// [container, pathSegments] entries, so nesting depth never costs
// call-stack frames and there is no recursion depth to worry about.
// Objects contribute their keys as segments, arrays their indices; only
// scalars terminate a path. Once the per-element leaf maps exist, the
// sorted union of paths forms the header row and each row is read column
// by column. A missing key means "" but a present falsy value (false, 0,
// "", null) must survive untouched — so membership is tested with
// Map.has, never truthiness.
function toMatrix(arr) {
    const columns = new Set();
    const maps = [];
    for (const item of arr) {
        const map = new Map();
        const stack = [[item, []]];
        while (stack.length > 0) {
            const entry = stack.pop();
            const node = entry[0];
            const segs = entry[1];
            if (Array.isArray(node)) {
                for (let index = node.length - 1; index >= 0; index--) {
                    stack.push([node[index], segs.concat(String(index))]);
                }
            } else if (node !== null && typeof node === "object") {
                for (const key of Object.keys(node)) {
                    stack.push([node[key], segs.concat(key)]);
                }
            } else {
                const path = segs.join(".");
                map.set(path, node);
                columns.add(path);
            }
        }
        maps.push(map);
    }
    const names = Array.from(columns).sort();
    const matrix = [names];
    for (const map of maps) {
        matrix.push(names.map((name) => (map.has(name) ? map.get(name) : "")));
    }
    return matrix;
}

class Solution {
    run(matrixCase) {
        matrixCase.drive(toMatrix);
    }
}
