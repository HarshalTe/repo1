
export const ArraysObjects1 = (d, type) => {
  if (type === "i") {
    return d + 1;
  }
  if (type === "d") {
    const a = d - 1;
    if (a >= 0) {   // prevent negative numbers
      return a;
    }
  }
  return d;
};
export const stringobj = (str)=>{
   if(str === "harshal")
   {
    return "shruti"
   }
   if(str === "shruti")
   {
    return "harshal"
   }
}

const ar1 = [
    "harshal",
    "vishal",
    "tejas",
    "suraj",
    "prathamesh"
]

export const ar2 = ar1.map((e,i)=>{
    return(
        <>
            <div>
                <h1 key={i}>{e}</h1>
            </div>
        </>
    );
})


 