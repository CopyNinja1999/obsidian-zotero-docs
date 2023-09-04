import { Callout } from "nextra/components";
import clsx from "clsx";

import styles from "../install.module.css";
import { useData } from "nextra/data";
import type { ObsidianInstallProps } from "./data";
import LatestBadge, { releaseUrl } from "../latest-badge";
import Versions from "../version";

type Channel = "main" | "beta";

export const ObsidianInfo = ({
  channel = "main",
}: {
  channel?: Channel[] | Channel;
}) => {
  const props = useData() as ObsidianInstallProps;

  const info = (() => {
    for (const c of Array.isArray(channel) ? channel : [channel]) {
      if (props[c]) return props[c];
    }
    return null;
  })();
  if (!info) return null;
  const { requireObsdian, version } = info;
  return (
    <Callout type="info">
      <div>
        Latest Version:
        <Versions values={[version]} />
      </div>
      <div>
        Required Obsidian Version:
        <Versions values={[requireObsdian]} />
      </div>
    </Callout>
  );
};

export function ViaObsidianInfo() {
  const { enlisted } = useData() as ObsidianInstallProps;
  if (!enlisted) {
    return <Callout type="error">Not yet Available</Callout>;
  }
  return <ObsidianInfo />;
}

const toDownloadLink = (file: string, ver: string | null = null) => {
  if (ver === "latest") {
    return `${releaseUrl}/latest/download/${file}`;
  } else if (ver) {
    return `${releaseUrl}/download/${ver}/${file}`;
  } else {
    return releaseUrl;
  }
};

export const ReleaseLink = () => {
  const { main: mainManifest, beta: betaManifest } =
    useData() as ObsidianInstallProps;

  const manifest = mainManifest ?? betaManifest;
  return (
    <LatestBadge
      href={toDownloadLink("zotlit.zip", manifest?.version)}
      type="obsidian"
      newPage
    />
  );
};
