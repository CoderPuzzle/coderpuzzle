/**
 * @param {string[][]} paths
 * @return {string[][]}
 */
var deleteDuplicateFolder = function (paths) {
    // trie nodes: children maps name -> node id; node 0 is the root
    var children = [{}];
    var nextId = 1;
    for (var p = 0; p < paths.length; p++) {
        var path = paths[p];
        var node = 0;
        for (var i = 0; i < path.length; i++) {
            var name = path[i];
            if (children[node][name] === undefined) {
                children.push({});
                children[node][name] = nextId;
                nextId++;
            }
            node = children[node][name];
        }
    }
    var total = nextId;

    // collect all nodes (parents always appear before their children)
    var nodes = [];
    var stack = [0];
    while (stack.length > 0) {
        var u = stack.pop();
        nodes.push(u);
        var ch = children[u];
        for (var key in ch) {
            if (Object.prototype.hasOwnProperty.call(ch, key)) {
                stack.push(ch[key]);
            }
        }
    }

    // assign subtree signature ids in post-order (children before parents)
    var sigToId = {};
    var sigCounts = {};
    var nodeSig = new Array(total);
    for (var ni = nodes.length - 1; ni >= 0; ni--) {
        var node2 = nodes[ni];
        var entries = [];
        var ch2 = children[node2];
        for (var name2 in ch2) {
            if (Object.prototype.hasOwnProperty.call(ch2, name2)) {
                entries.push([name2, nodeSig[ch2[name2]]]);
            }
        }
        entries.sort(function (a, b) {
            return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
        });
        var key2 = "";
        for (var e = 0; e < entries.length; e++) {
            key2 += entries[e][0] + "" + entries[e][1] + "";
        }
        var sid;
        if (sigToId[key2] === undefined) {
            sid = Object.keys(sigToId).length;
            sigToId[key2] = sid;
        } else {
            sid = sigToId[key2];
        }
        nodeSig[node2] = sid;
        sigCounts[sid] = (sigCounts[sid] || 0) + 1;
    }

    var marked = new Array(total).fill(false);
    for (var m = 0; m < nodes.length; m++) {
        var node3 = nodes[m];
        if (Object.keys(children[node3]).length > 0 && sigCounts[nodeSig[node3]] >= 2) {
            var markStack = [node3];
            while (markStack.length > 0) {
                var cur = markStack.pop();
                marked[cur] = true;
                var ch3 = children[cur];
                for (var k in ch3) {
                    if (Object.prototype.hasOwnProperty.call(ch3, k)) {
                        markStack.push(ch3[k]);
                    }
                }
            }
        }
    }

    var result = [];
    var collectStack = [[0, []]];
    while (collectStack.length > 0) {
        var top = collectStack.pop();
        var cu = top[0],
            prefix = top[1];
        var chu = children[cu];
        for (var nm in chu) {
            if (!Object.prototype.hasOwnProperty.call(chu, nm)) continue;
            var child = chu[nm];
            if (marked[child]) continue;
            var newPath = prefix.concat([nm]);
            result.push(newPath);
            collectStack.push([child, newPath]);
        }
    }
    result.sort(function (a, b) {
        var len = Math.min(a.length, b.length);
        for (var i2 = 0; i2 < len; i2++) {
            if (a[i2] < b[i2]) return -1;
            if (a[i2] > b[i2]) return 1;
        }
        return a.length - b.length;
    });
    return result;
};
