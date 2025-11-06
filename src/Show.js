

const Show = ({ array,objects }) => {


    return (
        <>
               {objects.userdata.arob2.map((ar,ari)=>{

                       return(
                        <>
                             <div key={ari}>
                                <h1>{ar}</h1>
                             </div>
                        </>
                       );

               })}
            {/* {
                array.map((ele, i) => {
                    return (
                        <>
                            <div key={i}>
                                <h1>{ele.objects1}</h1>
                                <h1>{ele.objects2}</h1>
                            </div>


                        </>
                    );
                })
            } */}
        </>
    );
}
export default Show;