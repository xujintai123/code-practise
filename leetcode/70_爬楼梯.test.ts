/*
 * @lc app=leetcode.cn id=70
 *
 * [70] 爬楼梯
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/climbing-stairs/
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

import { describe, expect, test } from '@jest/globals';

function climbStairs(n: number): number {
    if (n < 3) return n;

    /* 一共一层只有一种方式； 一共两层只有两种方式；*/
    let dp = [1, 2];

    // 分成多个子问题，爬第n阶楼梯的方法数量，等于 2 部分之和
    /* 1.爬上 n - 1阶楼梯的方法数量。因为再爬1阶就能到第n阶 */
    /* 2.爬上 n - 2阶楼梯的方法数量，因为再爬2阶就能到第n阶 */

    /* 爬到第 3 层，有从1 层 爬两层 和 2 层 爬一层 两种方式（取集合） */
    /* 爬到第 n 层，有从n - 1 层 爬一层 和 n - 2 层 爬两层 两种方式（取集合） */
    for (let i = 3; i <= n; i++) {
        const sum = dp[0] + dp[1];
        dp[0] = dp[1];
        dp[1] = sum;
    }
    
    return dp[1];
};


describe('fib module', () => {
    test('111', () => {
        expect(climbStairs(2)).toBe(2);
    });

    test('222', () => {
        expect(climbStairs(3)).toBe(3);
    });
});