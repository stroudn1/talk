/*
  Variables defined in `variables.ts` are already available
  flattened and in kebab case.

  These are additionally variables we define.
*/

import flat from "flat";
import { kebabCase, mapKeys, mapValues, pickBy } from "lodash";
import fs from "fs";
import path from "path";
import postcss from "postcss";
import postcssJs from "postcss-js";

import variables from "./variables";

const flatKebabVariables = mapKeys(
  mapValues(flat(variables, { delimiter: "-" }), (v) => v.toString()),
  (_, k) => `--${kebabCase(k)}`
);

// These are the default css standard variables.
const cssVariables = pickBy(
  flatKebabVariables,
  (v, k) => !k.startsWith("breakpoints-")
);

const typography = fs.readFileSync(path.join(__dirname, "./typography.css")).toString();
const typographyObject = postcssJs.objectify(postcss.parse(typography));

const cssObject = {
  ...typographyObject,
  ":root": {
    ...cssVariables,
    "--mini-unit": "calc(1px * var(--mini-unit-small))",
  },
  [`@media (min-width: ${variables.breakpoints.xs}px)`]: {
    ":root": {
      "--mini-unit": "calc(1px * var(--mini-unit-large))",
    },
  },
};

module.exports = cssObject;
