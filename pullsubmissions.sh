git reset --hard
git clean -fd
git checkout master

git branch -D submission-maurits
git checkout -B submission-maurits
git pull git://github.com/mevdschee/xmas2016.git master --no-edit
git merge evaluation --no-commit
