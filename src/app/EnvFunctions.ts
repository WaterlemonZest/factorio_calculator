export function imageAsset(path: string) {
  return `${process.env.NEXT_PUBLIC_ASSET_PREFIX}${path}`;
}
