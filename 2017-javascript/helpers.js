import fs from "fs"
function importInput(path = "") {
  const input = fs.readFileSync(path).toString()
  return input
}
export { importInput }
