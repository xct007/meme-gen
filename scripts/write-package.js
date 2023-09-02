/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const { promisify } = require("util");
const fsAccess = promisify(fs.access);
const fileExists = async (filePath) =>
	fsAccess(filePath)
		.then(() => true)
		.catch(() => false);

const libPath = path.join(__dirname, "../dist");

const font_name = "impact.ttf";
const font_path = path.join(__dirname, font_name);
const font_url =
	"https://github.com/xct007/meme-gen/raw/main/src/utils/impact.ttf";

async function writePackageJson() {
	execSync(`curl -L -o "${font_path}" "${font_url}"`);
	const libExists = await fileExists(libPath);
	if (!libExists) {
		console.error("Dist folder not found after compiling TypeScript");
		process.exit(1);
	}
	const libCjs = path.join(libPath, "cjs");
	const libCjsExists = await fileExists(libCjs);
	if (libCjsExists) {
		const packageJson = JSON.stringify({ type: "commonjs" }, null, 2);
		await Promise.all([
			fs.promises.writeFile(
				path.join(libCjs, "package.json"),
				packageJson,
			),
			fs.promises.copyFile(
				font_path,
				path.join(libCjs, "utils", font_name),
			),
		]);
	} else {
		console.warn("CJS folder not found");
	}
	const libEsm = path.join(libPath, "esm");
	const libEsmExists = await fileExists(libEsm);
	if (libEsmExists) {
		const packageJson = JSON.stringify({ type: "module" }, null, 2);
		await Promise.all([
			fs.promises.writeFile(
				path.join(libEsm, "package.json"),
				packageJson,
			),
			fs.promises.writeFile(
				path.join(libEsm, "utils", "fonts.js"),
				esm_fonts_export(),
			),
			fs.promises.copyFile(
				font_path,
				path.join(libEsm, "utils", font_name),
			),
		]);
	} else {
		console.warn("ESM folder not found");
	}

	const typesPath = path.join(libPath, "@types");
	const typesExists = await fileExists(typesPath);
	if (!typesExists && !libEsmExists && !libCjsExists) {
		console.error("No compiled TypeScript files found");
		process.exit(1);
	}
	await fs.promises.unlink(font_path);
}
function esm_fonts_export() {
	return `import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const FONT_IMPACT = join(__dirname, "impact.ttf");`;
}
if (require.main === module) writePackageJson();
