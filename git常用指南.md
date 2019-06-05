### 最常用步骤：

```
git strtus *  查看当前状态
git diff *  查看文件的修改
git commit  -m 提交本次修改
git push origin master  推送当前分支到远端

```

### 仓库初始化

```
# 初始化当前目录为一个 git 仓库
git init .

# 新建一个目录并初始化为 git 仓库
git init <Directory>

# 初始化一个裸的仓库，即没有工作区，通常用于作为远程仓库
git init --bare

# 从远程克隆一个仓库到本地
git clone <url>
```

### 查看提交历史

```
# 显示当前分支的版本历史
git log

# 显示当前分支的版本历史，同时显示每个提交发生变化的文件
git log --stat

# 按作者查看版本历史，作者名不需要精确匹配，仅需要包含即可
git log --author="Huoty"

# 按 commit 信息查看，-i 参数可以忽略大小写
git log --grep="xxx"

# 按日期查看，可用 --after 或 --before 来按日期赛选
git log --after="2018-04-01" --before="2018-04-15"

# 显示每次提交中被修改文件简要的增改行数统计
git log --stat

# 简短的显示文件的变化状态统计，不显示变化的文件名
git log --shortstat

# 展开显示每次提交的内容差异，-num 可只显示开头的提交，如 -2 表示仅显示最近的两次更新
git log -p

# 展示每个提交所在的分支及其分化衍合情况
git log --pretty=fuller --graph

# 把每个版本历史信息压缩到一行
git --no-pager log --oneline --decorate

# 显示某次提交的内容
git show <Commit ID>
```

### 单文件历史

```
# 显示某个文件的历史版本的所有改动
git log --follow -p [file]
git whatchanged -p [file]

# 显示指定文件的每一行内容的作者和修改时间
git blame [file]
```

### 差异比较

```
# 查看工作区域暂存区的差异
git diff

# 查看暂存区与版本库的差异
git diff --cached
git diff --staged

# 查看 工作区、暂存区 与 HEAD 的差异
git diff HEAD  

# 查看 branch2 分支的哪些改动不存在于 branch1 上
git diff branch1..branch2

# 查看当前分支与主分支最近公共祖先的差异
git diff master...
```

### 暂存工作区

```
# 保存当前的工作进度。会分别对暂存区和工作区的状态进行保存
git stash

# 显示进度列表。git stash 可以多次保存工作进度，并可在恢复时候进行选择
git stash list

# 恢复暂存。如果不使用任何参数，会恢复最新保存的工作进度
git stash pop [--index] [<stash>]

# 恢复暂存，但不删除进度
git stash apply [--index] [<stash>]

# 清除所有暂存
git stash clear
```

### 整理提交历史

```
# 修改最新一个提交
git commit --amend

# 整理某一提交之后的所有提交
git rebase -i <Commit ID>

# 修改历史上任意提交
git commit --fixup <Commit ID>
git commit --squash <Commit ID>
```

### 代码回滚

```
# 撤销指定文件在工作区中的修改
git checkout [file]

# 建立一个临时分支，并将 HEAD 指向指定的 commit
git checkout [commit]

# 恢复某个文件的内容为指定的 commit 或者 branch
git checkout [commit/branch] [file]

# 从其他分支检出某个目录下的所有内容到当前分支
git checkout [branch] -- [path]

# 撤销工作区中当前目录下的所有修改
git checkout .

# 恢复添加到暂存区的内容到工作中
git reset [file]

# 重置暂存区与工作区为指定的 commit
git reset --hard [commit]

# 重置当前分支的指针为指定 commit，同时重置暂存区，但工作区不变
git reset [commit]

# 保持暂存区和工作区不变，但重置当前 HEAD 为指定的 commit
git reset --keep [commit]

# 撤销指定 commit 的修改并生成一个新的 commit
git revert [commit]
```

### 其他命令

```
# 新建分支
git branch [name]

# 列出远程跟踪分支
git branch -r

# 使用通配符列出匹配的分支（示例列出 featrue/ 开头的分支）
git branch --list 'featrue/*'

# 列出本地分支和远程跟踪分支
git branch -a

# 列出其他分支被合并到当前分支的情况
git branch --merged
git branch --no-merged

# 分支重命名
git branch -m [old-name] [new-name]

# 删除分支
git branch -d [name]  # 删除已合并的分支
git branch -D [name]  # 强制删除分支即使未被合并

# 删除远程分支
git push origin --delete [branch]

#分支替换
 git push -f origin develop:master
 
 # 切换到旧的分支
$ git checkout master  

# 将本地的旧分支 master 重置成 develop
$ git reset --hard develop  

# 再推送到远程仓库
$ git push origin master --force

# 交互式的一段一段的添加修改到工作区
git add -p

# 仅将新增加的文件路径添加到暂存区，但不添加内容
git add -N

# 删除本地已经合并的分支
git branch -d [branch]

# 强制删除本地分支，即使没被合并
git branch -D [branch]

# 在提交的时候指定作者信息
git commit --author="name <email@mail.com>" ...

# 生成一个可供发布的压缩包
git archive
git archive --format=[archive format] \
    --prefix=[archive prefix path] [branch] \
    > [archive path]
```

### 打上标签

```
 #列出所有标签
git tag

# 新建轻量级标签：
git tag [tagname]

# 新建带附注标签
git tag -a [tagname] -m [message]

# 删除本地标签
git tag -d [tagname]

# 查看标签信息
git show [tagname]

# 推送标签
git push [remote] [tagname]

# 提交所有标签
git push [remote] --tags

# 获取远程标签：
git fetch origin tag [tagname]

# 新建一个分支，指向某个标签
git checkout -b [branch] [tagname]

远程删除标签：
# 1. 使用参数 --delete:
git push origin --delete tag <tagname>

# 2. 相当于推送一个空分支到远程分支:
git push origin :<tagname>

# 3. 先删除本地 tag，在推送一个空的 tag 到远程仓库：
git tag -d
git push origin :refs/tags/<tagname>
```

###远程仓库

```
# 显示所有远程仓库
git remote -v

# 显示某个远程仓库的信息
git remote show [remote]

# 增加一个新的远程仓库，并命名
git remote add [remote] [url]

# 修改远程仓库地址
git remote set-url [remote] [url]

# 拉取远程仓库的所有变动
git fetch [remote]
git remote update [remote]

# 拉取远程仓库中的指定分支并与本地分支合并
git pull [remote] [branch]

# 上传本地指定分支到远程仓库
git push [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
git push [remote] [branch] --force

# 推送所有分支到远程仓库
git push [remote] --all

# 从远程仓库删除分支
#（谨慎操作，一般不建议这么做，生产仓库应禁止该功能）
git push [remote] --delete [branch]
```

### git clean清除工作区

```
# 以下参数必须提供一个
-i --interactive 交互方式显示将要完成的操作和清理文件
-n --dry-run 仅打印要删除的文件，但不实际执行删除操作
-f --force 确定移除，即无论如何都强制移除

# 以下参数为可选参数
-d 连同目录一起删除
-x 删除所有未跟踪的文件，不管是否包含在 .gitignore 文件中
-X 仅删除 .gitignore 文件中包含的文件
```



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

