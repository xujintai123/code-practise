

/*
 * @lc app=leetcode.cn id=47
 *
 * [47] 全排列 II
 *
 * https://leetcode.cn/problems/permutations-ii/
 *
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/permutations-ii/
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * 示例:
 * 
 * 输入：nums = [1,1,2]
 * 输出：[[1,1,2], [1,2,1], [2,1,1]]
 * 
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 
 */

import { describe, expect, test } from '@jest/globals';

function permuteUnique(nums: number[]): number[][] {
    let res: number[][] = [], path: number[] = [];
    /* 记录每个位置的数值是否在本次dfs使用过 */
    let record: boolean[] = [];

    nums.sort((a, b) => {
        return a - b
    });

    function backtracking() {
        if (path.length === nums.length) {
            res.push(path.slice());
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            /* nums[i] === nums[i - 1] 并且在树层时需要考虑去重，还要判断此时是在树枝还是树层（树枝不需要去重，树层需要去重） */
            /* !record[i - 1] 可以判断此时是在树层 */
            /* 由于使用了nums[i - 1]， 所以需要i > 0; */
            if (i > 0 && nums[i] === nums[i - 1] && !record[i - 1]) continue;

            /* 此位置的数值在本次dfs中已经使用过 */
            if (record[i]) continue;

            record[i] = true;
            path.push(nums[i]);
            backtracking();
            record[i] = false;
            path.pop();
        }
    }

    backtracking();

    return res;
};


describe('permuteUnique module', () => {
    test('[1,1,2] toEqual [[1,1,2], [1,2,1], [2,1,1]]', () => {
        expect(permuteUnique([1, 1, 2])).toEqual([[1, 1, 2], [1, 2, 1], [2, 1, 1]]);
    });

    test('[1,2,3] toEqual [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', () => {
        expect(permuteUnique([1, 2, 3])).toEqual([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]);
    });
});