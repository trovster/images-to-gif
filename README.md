# Folder to GIF

Convert a folder of images to a GIF.

## Running

Install Node and dependencies.

```sh
nvm use
npm install
```

Put a folder of images in the `src` folder, then run the script.

```sh
node convert \
    --source=avatars \
    --filename=avatars.gif \
    --quality=30 \
    --duration=100 \
    --height=1024 \
    --width=1024
```

```sh
npm start -- --filename=test.gif
```

## Dependencies

* [make-a-gif](https://github.com/VyrekXD/MAG)
* [minimist](https://github.com/substack/minimist)
