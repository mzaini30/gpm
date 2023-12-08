#!/usr/bin/env node

import { $ } from "zx";
import { existsSync, readFile, readFileSync, writeFileSync } from "fs";

let file_config = existsSync("./gpm.txt");
if (!file_config) {
    writeFileSync("./gpm.txt", "");
}

let gitignore = existsSync("./.gitignore");
if (!gitignore) {
    writeFileSync("./.gitignore", "");
}

let yang_diignore = readFileSync("./.gitignore").toString();
yang_diignore += `\ngpm`;
let array_yang_diignore = yang_diignore.split("\n");
array_yang_diignore = [...new Set(array_yang_diignore)];
yang_diignore = array_yang_diignore.join("\n");
writeFileSync("./.gitignore", yang_diignore);

let config_gpm = existsSync("./gpm.txt");
if (!config_gpm) {
    writeFileSync("./gpm.txt");
}

let ambil_gpm = readFileSync("./gpm.txt").toString().split("\n");
if (ambil_gpm.length > 0 && ambil_gpm[0] != "") {
    for (let x of ambil_gpm) {
        $`degit ${x} gpm/${x} -f`;
    }
}

if (process.argv[2]) {
    // jika ada package yang diinstall: gpm mzaini30/tes
    let ambil_config_gpm = readFileSync("./gpm.txt").toString();
    let paket = process.argv.slice(2);
    for (let x of paket) {
        $`degit ${x} gpm/${x} -f`;
        ambil_config_gpm += `\n${x}`;
    }
    ambil_config_gpm = [...new Set(ambil_config_gpm.split("\n"))].join("\n").trim();
    writeFileSync("./gpm.txt", ambil_config_gpm);
}