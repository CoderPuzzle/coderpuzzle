// The generator must respect the runner's shallow call stack — nesting
// depth can far exceed what recursion should be trusted with — so the
// walk keeps an explicit frame stack: each frame is one array currently
// being iterated plus its cursor. Descending into a sub-array pushes a
// fresh frame; a frame that runs out of elements pops, and the parent
// resumes exactly where it left off. Pops replay the left-to-right
// sequence lazily, one yield per next() call.
function* inorderTraversal(arr) {
    const frames = [{ items: arr, cursor: 0 }];
    while (frames.length > 0) {
        const frame = frames[frames.length - 1];
        if (frame.cursor >= frame.items.length) {
            frames.pop();
            continue;
        }
        const value = frame.items[frame.cursor++];
        if (Array.isArray(value)) {
            frames.push({ items: value, cursor: 0 });
        } else {
            yield value;
        }
    }
}

class Solution {
    run(generatorCase) {
        generatorCase.drive(inorderTraversal);
    }
}
