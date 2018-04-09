最常用步骤：

git strtus *  查看当前状态

git diff *  查看文件的修改

git commit  -m 提交本次修改

git push origin master  推送当前分支到远端



git checkout -b devlop  创建开发分支drvlop

**git fetch --all**   # → 拉取所有远端的最新代码 

git merge origin/master**   # → 上线之前保证当前分支不落后于远端origin/master，一定要merge远端origin/master到当前分支 

git merge origin/develop   **# → 如果是多人协作，merge同事的修改到当前分支（先人后己原则

git merge --no-ff origin/develop**   # → 同事review code之后管理员合并origin/develop到远端主干origin/master



git branch  # → 查看本地所有的分支```

git branch -r    # → 查看所有远程的分支```

git branch -a  # → 查看所有远程分支和本地分支```

git branch -d <branchname>**`** **`# → 删除本地branchname分```

git branch -m brancholdname  branchnewname**`** **`# → 重命名分支```

git branch <branchname>**`** **`# → 创建branchname分支```

git checkout <branchname>**`** **`# → 切换分支到branchname```

git checkout -b <branchname>**`** **`# → 等同于执行上两步，即创建新的分支并切换到该分支```

git checkout -- xx/xx**`** **`# → 回滚单个文件```

git pull origin master:master**`** **`# → 将远程origin主机的master分支合并到当前master分支,冒号后面的部分表示当前本地所在的分支```

git push origin -d <branchname>**   # → 删除远程branchname分支`****``

git fetch --p**`**   **`# → 更新分支```

git status**`** **`# → 查看本地工作区、暂存区文件的修改状态```

git add xx**`** **`# → 把xx文件添加到暂存区去`

