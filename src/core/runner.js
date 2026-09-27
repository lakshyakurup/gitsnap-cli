export function runCommand(name, args = []) {
  return {
    name,
    args,
    ok: true
  };
}
