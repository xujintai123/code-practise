/*
 * @lc app=leetcode.cn id=46 lang=csharp
 *
 * [46] 全排列
 *
 * https://leetcode-cn.com/problems/permutations/description/
 *
 * algorithms
 * Medium (71.85%)
 * Likes:    511
 * Dislikes: 0
 * Total Accepted:    74.4K
 * Total Submissions: 100.8K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个没有重复数字的序列，返回其所有可能的全排列。
 * 
 * 示例:
 * 
 * 输入: [1,2,3]
 * 输出:
 * [
 * ⁠ [1,2,3],
 * ⁠ [1,3,2],
 * ⁠ [2,1,3],
 * ⁠ [2,3,1],
 * ⁠ [3,1,2],
 * ⁠ [3,2,1]
 * ]
 * 
 */

function permute(nums: number[]): number[][] {
    let map: Record<string, boolean> = {}, res: number[][] = [], currentArr: number[] = [];
    /*
     * @param depth: dfs的深度
     * 退出条件: depth深度和nums长度相等
     * 方法体: 为currentArr的depth位置添加数值
     * currentArr每一个位置（depth）的值都遍历nums获取，并且当前位置的值不能取本次递归过程中已使用的值
     * 由于序列中没有重复数值，所以在递归过程中，可以通过往currentArr添加新值时 使用map标记数值方式记录；回溯过程中将标记清除
    */
    function dfs(depth: number) {
        if (depth === nums.length) {
            /* 这里使用currentArr.slice()；
            是因为currentArr是通用容器，如果不slice，就会出现push进currentArr的都引用着最新的currentArr */
            res.push(currentArr.slice());
            return;
        };

        
        /* 标记数值是否在本次dfs中已经被使用，回溯的过程中要清除标记 */
        for (let i = 0; i < nums.length; i++) {
            const target = nums[i];
            if (!map[target]) {
                currentArr[depth] = target;
                map[target] = true;
                dfs(depth + 1);
                map[target] = false;
            }
        }
    }

    dfs(0);
    return res;
};

permute([1,2,3]);

// @lc code=end
