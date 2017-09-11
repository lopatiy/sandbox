# GIT hook

```sh
touch .git/hooks/post-merge && chmod a+x .git/hooks/post-merge
echo "../../start.sh" > .git/hooks/post-merge
```
---
# Dependencies

Dropbox (https://www.dropbox.com/install-linux) :

```sh
cd ~ && wget -O - "https://www.dropbox.com/download?plat=lnx.x86_64" | tar xzf -
```

Youtube-dl :
```sh
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
```

Mongo DB

```sh
sudo apt-get install mongodb
```
