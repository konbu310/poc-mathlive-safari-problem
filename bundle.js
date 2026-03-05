import { build, context } from "esbuild";
import { parseArgs } from "node:util";

function createJsOptions() {
  return {
    entryPoints: ["./src/main.tsx"],
    entryNames: "[name]",
    outdir: "./docs",
    bundle: true,
    sourcemap: "inline",
    minify: false,
    treeShaking: true,
    target: "es2022",
    logLevel: "info",
    color: true,
    format: "esm",
    platform: "browser",
    jsx: "automatic",
    jsxDev: true,
  };
}

function createCssOptions() {
  return {
    entryPoints: [
      "src/style.css",
      {
        out: "mathlive",
        in: "./node_modules/mathlive/mathlive-static.css",
      },
    ],
    entryNames: "[name]",
    bundle: true,
    minify: false,
    outdir: "./docs",
    logLevel: "info",
    color: true,
    external: ["../font/*"],
    assetNames: "fonts/[name]",
    loader: {
      ".woff2": "file",
    },
  };
}

const watchJs = async () => {
  const ctx = await context(createJsOptions());
  await ctx.watch();
};
const watchCss = async () => {
  const ctx = await context(createCssOptions());
  await ctx.watch();
};

const buildJs = async () => {
  await build(createJsOptions());
};
const buildCss = async () => {
  await build(createCssOptions());
};

const {
  values: { watch },
} = parseArgs({
  args: process.argv.slice(2),
  options: {
    watch: {
      type: "boolean",
    },
  },
});

if (watch) {
  Promise.all([watchJs(), watchCss()]).catch((err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  Promise.all([buildJs(), buildCss()])
    .catch((err) => {
      console.error(err);
      process.exit(1);
    })
    .then(() => {
      process.exit(0);
    });
}
