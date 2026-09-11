// Navigation surfaces overlap by more than a character diameter at joins.
export const DIVIDERS=[[-2.78,-4.25,-2.62,-1.15],[2.62,-4.25,2.78,-1.15]];
export function worldBounds(kind){
 return kind==='islands'
  ? [[-11,-3.9,-4.5,4.1],[-3.3,-3.9,3.3,4.1],[4.5,-3.9,11,4.1],[-5.15,.2,-2.65,1.8],[2.65,.2,5.15,1.8]]
  : [[-8.4,-4,8.4,4.6]];
}
