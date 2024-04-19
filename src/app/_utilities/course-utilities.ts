// import {CourseSide, TeeStation, TeeStationHolesInner} from "@golf-api";
//
// export function newTeeStation(numberOfSides: number = 2, holesPerSide = 9): TeeStation {
//
//   let numberOfHoles = holesPerSide * numberOfSides
//
//   // Define a definition for the length of every hole on the course, etc
//   const holes = new Array<TeeStationHolesInner>()
//   for (let index=0; index<numberOfHoles; index++) {
//     let hole : TeeStationHolesInner = {
//       number: index,
//     }
//     holes.push(hole)
//   }
//
//   const sides = new Array<CourseSide>()
//   for (let index=0; index<numberOfSides; index++) {
//     const side = {}
//     sides.push(side)
//   }
//
//   return {
//     sides: sides,
//     holes: holes
//   }
// }
