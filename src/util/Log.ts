
export const log = function(...args: any[]) {
  
  console.log(`[${new Date().toLocaleString()}]`, ...args)
}