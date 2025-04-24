# `shiki-git-diff`

## Install

```sh
pnpm add shiki-git-diff
```

## Configure

```js
import { shikiGitDiff, shikiGitDiffOptions } from "shiki-git-diff";
    // ...
    transformers: [
        shikiGitDiff({
            // default options
            classLineAdd: "add",
            classLineRemove: "remove",
            classActivePre: "diff",
            condition: (meta: string) => meta.endsWith("diff"),
        }),
    ],
    // ...
```

## Display

```less
code>[data-line] {
    &.diff.add {
        background-color: rgba(67, 218, 64, 0.3);
    }
    &.diff.remove {
        background-color: rgba(229, 38, 38, 0.3);
    }
}
```
