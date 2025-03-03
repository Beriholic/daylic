# [daylic](news.beriholic.xyz)
Daily Morning Report

## deploy
```
dokcer run -it -d --name daylic -p 3000:3000 beriholic/daylic:0.2.0
```

```
services:
  daylic:
    image: beriholic/daylic:0.2.0
    ports:
      - 3000:3000
```
