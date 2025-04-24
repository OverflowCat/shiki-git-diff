import { ShikiTransformer } from "shiki";

export type shikiGitDiffOptions = {
    classLineAdd?: string;
    classLineRemove?: string;
    classActivePre?: string;
    condition?: (meta: string) => boolean;
};

export function shikiGitDiff(
    options: shikiGitDiffOptions = {}
): ShikiTransformer {
    const {
        classLineAdd = "add",
        classLineRemove = "remove",
        classActivePre = "diff",
        condition = (meta: string) => meta.endsWith("diff"),
    } = options;
    return {
        name: "shiki-git-diff",
        code: function (hast) {
            // @ts-expect-error
            if (!condition(this.options.meta.__raw)) return;
            for (const line of hast.children) {
                if (line.type !== "element") {
                    continue;
                }
                const firstSpan = line?.children?.at(0);
                let firstChar: string | undefined = undefined;
                if (firstSpan?.type === "text") {
                    firstChar = firstSpan.value[0];
                } else if (firstSpan?.type === "element") {
                    const firstText = firstSpan?.children?.at(0);
                    if (firstText?.type === "text") {
                        firstChar = firstText.value?.at(0);
                    }
                }
                if (firstChar === "+") {
                    this.addClassToHast(line, [classActivePre, classLineAdd]);
                } else if (firstChar === "-") {
                    this.addClassToHast(line, [classActivePre, classLineRemove]);
                }
            }
        }
    }
}
