// We need to import the module first.
import { Gif as Make } from 'make-a-gif'

import minimist from 'minimist'

// This is for get the dirname.
import { fileURLToPath } from 'url'
import { join, dirname, extname } from 'path'

// Import fs to write the gif.
import { writeFile } from 'fs/promises'

// Import fs to find files.
import { readdirSync, readFileSync } from 'fs'

// This is for get the dirname.
// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get any arguments.
var argv = minimist(process.argv.slice(2), {
  default: {
    // Source folder path.
    source: 'avatars',

    // Output filename.
    filename: 'avatars.gif',

    // Per frame duration.
    duration: 250,

    // Quality, from 1 (worst) to 30 (best).
    quality: 30,

    // Output image dimensions.
    width: 1024,
    height: 1024,
  }
})

// Source folder of images.
const folder = join(__dirname, 'src', argv.source);

// An async function because to render the image.
;(async () => {
  const gif = new Make(argv.width, argv.height, argv.quality)

  const frames = readdirSync(folder)
    .filter(filename => {
      return extname(filename) === '.png'
    }).map(filename => {
      const path = join(folder, filename)

      return {
        src: readFileSync(path, null).buffer,
        duration: argv.duration
      }
    })

  await gif.setFrames(frames)

  // Render the image, it will return a Buffer or it will give an error if anything goes wrong.
  const encoded = await gif.encode()

  // Writes the gif in this folder.
  await writeFile(join(__dirname, 'output', argv.filename), encoded)
})()
