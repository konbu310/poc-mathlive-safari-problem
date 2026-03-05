import { context } from "esbuild";

async function watchClientJs() {
  const ctx = await context({
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
  });
  await ctx.watch();
}

async function watchCss() {
  const ctx = await context({
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
  });
  await ctx.watch();
}

await Promise.all([watchClientJs(), watchCss()]);
