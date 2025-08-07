function UrlCreate(file: File | undefined): string | undefined {
  if (!file) return undefined;
  const url = URL.createObjectURL(file);
  return url;
}
export default UrlCreate;
