let currentId = 0

export const makeId = () => {
  currentId += 1
  return String(currentId)
}
