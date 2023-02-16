/*
 * @lc app=leetcode.cn id=131
 *
 * [131] 分割回文串
 *
 * https://leetcode.cn/problems/palindrome-partitioning/
 *
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
 * 
 * 示例:
 * 
 * 输入：s = "aab"
 * 输出：[["a","a","b"],["aa","b"]]
 * 
 */

function partition(s: string): string[][] {
    let arr: string[] = [], res: string[][] = [];

    function isReverseStr(str: string) {
        // return str.split('').reverse().join('') === str;
        let left = 0, right = str.length - 1;
        while (left < right) {
            if (str[left++] !== str[right--]) {
                return false;
            }
        }
        return true;
    }


    /* 回溯模版 */
    function backtracking(str: string) {
        if (str === '') {
            res.push(arr.slice());
            return;
        }
        /* 回溯模版 */
        for (let i = 0; i < str.length; i++) {
            const curStr = str.slice(0, i + 1);
            if (!isReverseStr(curStr)) {
                continue;
            }
            const lastStr = str.slice(i + 1);
            arr.push(curStr);
            backtracking(lastStr);
            arr.pop();
        }

    }

    backtracking(s);

    return res;
};

partition('efe');