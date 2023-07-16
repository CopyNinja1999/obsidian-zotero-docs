import { useData } from "nextra/data";
import type { ObsidianInstallProps } from "./data";
import ViaObsidian from "./obsidian.mdx";
import ViaBRAT from "./brat.mdx";
import Manual from "./manual.mdx";
import { Tab, Tabs } from "nextra/components";

export default function ObsidianInstall() {
  const { defaultMethod } = useData() as ObsidianInstallProps;

  return (
    <Tabs
      items={["via Obsidian", "via BRAT", "Manual"]}
      defaultIndex={
        defaultMethod === "obsidian" ? 0 : defaultMethod === "brat" ? 1 : 2
      }
    >
      <Tab>
        <ViaObsidian />
      </Tab>
      <Tab>
        <ViaBRAT />
      </Tab>
      <Tab>
        <Manual />
      </Tab>
    </Tabs>
  );
}
