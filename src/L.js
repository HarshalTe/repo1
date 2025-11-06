const L = () => {
    const arr1 = ["a", "b", "c", "d"]

      const arr2 = ["raj", "harsh", "ansh", ""]
      const arr3 = [];

      for(let i = 0 ; i < arr2.length ; i++)
      {
          arr3.push(arr2[i])
        
      }
     


    return (<>


         <h1>{arr3 + "  " }</h1>
     
        {arr1.map((a, i) => {
            return (<>

                <div key={i}>
                    <h1>{a}</h1>
                </div>
            </>)

        })}


        {arr2.map((e,i)=>{
            return(
                <>
                    {i === 0 ? <h1>{e}</h1> : ""}
                </>
            );
        })}


       






    </>);
}

export default L;