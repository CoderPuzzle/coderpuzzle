class Solution {
    solve(diffCase) {
        // Walk both structures key-by-key with an explicit stack (work
        // items carry where each sub-result lands, so nesting depth of
        // the inputs never becomes call-stack depth): shared container
        // pairs recurse into a fresh difference block kept only when
        // non-empty, strictly-equal primitives record nothing, and
        // anything else lands whole as [obj1 value, obj2 value]. Keys
        // absent on either side are skipped outright — object keys need
        // obj2's OWN ownership ("in" would see inherited names like
        // constructor), array stops go only to the shorter length.
        diffCase.drive(objDiff);
    }
}

// Difference blocks are always JSON objects, so array indices enter them
// stringified — exactly like example 3's "2" / "3" keys.
function objDiff(obj1, obj2) {
    let result = {};
    const kindOf = (value) => {
        if (value === null || typeof value !== "object") return null;
        return Array.isArray(value) ? "array" : "object";
    };
    const stack = [{ mode: "compare", left: obj1, right: obj2, parent: null, key: null }];
    while (stack.length > 0) {
        const frame = stack.pop();
        if (frame.mode === "collect") {
            // the root comparison's block becomes the answer itself;
            // nested blocks attach under their key only when non-empty
            if (frame.parent === null) {
                result = frame.block;
            } else if (Object.keys(frame.block).length > 0) {
                frame.parent[frame.key] = frame.block;
            }
            continue;
        }
        const kind = kindOf(frame.left);
        if (kind === null || kind !== kindOf(frame.right)) {
            // same-kind primitives equal under ===; every other pairing
            // (type split included) is one leaf difference pair
            if (frame.left !== frame.right && frame.parent !== null) {
                frame.parent[frame.key] = [frame.left, frame.right];
            }
            continue;
        }
        const block = {};
        stack.push({ mode: "collect", parent: frame.parent, key: frame.key, block });
        if (kind === "object") {
            for (const key of Object.keys(frame.left)) {
                if (!Object.prototype.hasOwnProperty.call(frame.right, key)) continue;
                stack.push({ mode: "compare", left: frame.left[key], right: frame.right[key], parent: block, key });
            }
        } else {
            const stop = Math.min(frame.left.length, frame.right.length);
            for (let index = 0; index < stop; index++) {
                stack.push({
                    mode: "compare",
                    left: frame.left[index],
                    right: frame.right[index],
                    parent: block,
                    key: String(index),
                });
            }
        }
    }
    return result;
}
