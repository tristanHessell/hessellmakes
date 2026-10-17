import { readdir, rename, stat, unlink } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const scanRoots = ['src/assets', 'public'].map((path) =>
  resolve(projectRoot, path),
);
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png']);
const deleteOriginals = process.argv.includes('--delete-originals');
const qualityOption = process.argv.find((arg) => arg.startsWith('--quality='));
const quality = qualityOption ? Number(qualityOption.split('=')[1]) : 82;

if (!Number.isInteger(quality) || quality < 1 || quality > 100) {
  throw new Error('The quality value must be an integer from 1 to 100.');
}

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const path = resolve(directory, entry.name);

    if (entry.isDirectory()) {
      paths.push(...(await collectImages(path)));
    } else if (
      entry.isFile() &&
      supportedExtensions.has(extname(path).toLowerCase())
    ) {
      paths.push(path);
    }
  }

  return paths;
}

const sourcePaths = (
  await Promise.all(scanRoots.map((root) => collectImages(root)))
)
  .flat()
  .sort((a, b) => a.localeCompare(b));

let sourceBytes = 0;
let outputBytes = 0;

for (const sourcePath of sourcePaths) {
  const extension = extname(sourcePath);
  const outputPath = `${sourcePath.slice(0, -extension.length)}.webp`;
  const temporaryPath = `${outputPath}.tmp-${process.pid}`;
  const sourceSize = (await stat(sourcePath)).size;

  try {
    const result = await sharp(sourcePath)
      .rotate()
      .webp({ quality, effort: 5, smartSubsample: true })
      .toFile(temporaryPath);

    await rename(temporaryPath, outputPath);
    if (deleteOriginals) {
      await unlink(sourcePath);
    }

    sourceBytes += sourceSize;
    outputBytes += result.size;
    process.stdout.write(
      `${relative(projectRoot, sourcePath)} -> ${relative(projectRoot, outputPath)} (${sourceSize} -> ${result.size} bytes)\n`,
    );
  } catch (error) {
    await unlink(temporaryPath).catch(() => {});
    throw error;
  }
}

process.stdout.write(
  `Converted ${sourcePaths.length} images at quality ${quality}. ${sourceBytes} -> ${outputBytes} bytes.`,
);
if (deleteOriginals) {
  process.stdout.write(' Original files removed.');
} else {
  process.stdout.write(' Original files kept.');
}
process.stdout.write('\n');
