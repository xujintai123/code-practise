/*
 * @lc app=leetcode.cn id=39 lang=csharp
 *
 * [39] 组合总和
 *
 * https://leetcode.cn/problems/combination-sum/
 * 
 * 示例:
 * 
 * 输入: candidates = [2,3,6,7], target = 7
 * 输出: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * 
 */

// 由于已经进行了排序；所以对于和大于等于target的调用栈，返回特殊值，进行剪枝
function combinationSum(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => a - b);
    let res: number[][] = [];

    function dfs(arr: number[], list: number[]) {
        // 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
        if (res.length === 149) return;

        for (let i = 0; i < list.length; i++) {
            const num = getCount(arr, list[i]);
            // 由于是升序；超出target则直接退出
            if (num > target) return;
            if (num === target) {
                const group = [...arr.slice(), list[i]];
                if (!isEqual(res, group)) {
                    res.push(group);
                }
                
                return;
            }
            dfs([...arr, list[i]], list);
        }
    }

    function getCount(arr: number[], num: number) {
        return  arr.reduce((acc, cur) => acc + cur, num);
    }

    function isEqual(arr1: number[][], arr2: number[]) {
        // 下面注释的方法用来判断两个 number[] 的元素是否完全一致是不行的；反例：[5, 4, 4, 4, 4, 3, 3] 和 [5, 5, 4, 4, 3, 3, 3]
        // !res.find(a => a.length === group.length && group.every(b => a.includes(b)) && [...new Set(group)].length === [...new Set(a)].length)
        return arr1.find(a => a.length === arr2.length && arr2.every(b => a.includes(b)) && arr2.sort((a, b) => a - b).toString() === a.sort((a1, b1) => a1 - b1).toString());
    }

    for (let i = 0; i < candidates.length; i++) {
        const num = candidates[i];
        if (num > target) break;
        if (num === target) {
            res.push([num]);
            break;
        }
        /* 例如：第一轮循环2，3，6，7时，2 可以不断递归与 2，3，6，7进行累加；
        但第一轮循环轮到3时，就不应该再和2进行累加，否则就会重复 */
        dfs([num], candidates.slice(i));
    }

    return res;

};

// combinationSum([2,3,6,7], 7);
// combinationSum([2, 3, 5], 8);
// combinationSum([8,7,4,3], 11);
// combinationSum([7,3,2], 18);
combinationSum([5,10,8,4,3,12,9], 27); 
/* combinationSum([5,10,8,4,3,12,9], 27): 
由于使用 !res.find(a => a.length === group.length && group.every(b => a.includes(b)) && [...new Set(group)].length === [...new Set(a)].length) 判断两个数组是否完全一致，是不行的
结果错误 (导致的原因: res的值缺少 [3, 3, 4, 4, 4, 4, 5]) 
例如 [5, 4, 4, 4, 4, 3, 3] 和 [5, 5, 4, 4, 3, 3, 3]
转换判断方法 为 isEqual方法 */

// @lc code=end