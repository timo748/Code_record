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

### 使用分支

```
$ git checkout -b [branch]                //新建一个分支，并切换到该分支
$ git branch                              //命令会列出所有分支，当前分支前面会标一个*号。
$ git add . 
$ git commit -m "提交分支branch"
$ git checkout master                     //切换回master分支
$ git merge [branch]                      //把branch分支合并到master分支
$ git branch -d branch                     //合并完成后删除branch分支
```

创建并切换到parcel分支

$ git checkout -b parcel   

切回master分支

git checkout master

### 分支eg

```
$ git stash                                               //冷冻现在在dev分支上的工作状态 冻结吧！  
$ git checkout master                                     //这个bug发生在master主分支上,我们切回master分支
$ git checkout -b issue-101                               //创建代号101的修复bug分支
修改你的bug
$ git add readme.txt                                      //提交到暂存区
$ git commit -m "fix bug 101"                             //注意填写信息，以免日后查证
$ git checkout master                                     //切换回master分支
$ git merge --no-ff -m "merged bug fix 101" issue-101     //合并分支，注意不使用fast forward模式
$ git branch -d issue-101                                 //删除issue-101分支
$ git checkout dev                                        //bug 改完了，是时候回到dev继续写bug了
$ git stash list                                          //查看刚刚的冻结现场
$ git stash pop                                           //git stash pop，恢复的同时把stash内容也删了：
//一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除
```

