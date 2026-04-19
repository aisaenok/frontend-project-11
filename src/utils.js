export const createIdGenerator = () => {
  let currentId = 0

  return () => {
    currentId += 1
    return String(currentId)
  }
}
