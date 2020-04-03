export interface RootPoint {
  count: number;
  slopes?: ISlope[];
  value: number[];
}

export interface ISlope {
  value: number;
  points: number[][];
}

export const findMaxCount = (values: number[][]) => {
  let rootIndex = 0;
  let points : RootPoint[] = [];
  while (rootIndex < values.length) {
    let currentIndex = rootIndex + 1;
    points.push({ count: 1, value: values[rootIndex], slopes: [] });

    while (currentIndex < values.length) {
        let rootPoint = values[rootIndex]
        let currentPoint = values[currentIndex]

        if(currentPoint[0]=== rootPoint[0]){
            if(currentPoint[1] === rootPoint[1]){
                points[rootIndex].count++
            }
            else{
                if(points[rootIndex].slopes)
            }
        }

        
        currentIndex++;
    }

    rootIndex++;
  }
};
