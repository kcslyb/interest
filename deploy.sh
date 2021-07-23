#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

# 进入构建文件夹
cd dist

git init
git add -A
git commit -m 'deploy'

git remote add origin https://github.com/kcslyb/kcslyb.github.io.git

git push origin master

cd -