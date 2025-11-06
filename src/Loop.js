import { useEffect, useState } from "react";

const Loop = () => {
  const [ahowlist, setshowlist] = useState([]);

  const objects = {
    ob1: "a",
    ob2: "b",
    ob3: "c",
    ob4: "d",
    arr: ["1f", "2ff", "3fff", "4ffff"]
  }


  const user = [
    "a", "e", "y", "u",
    {
      id: '1',
      name: 'harshal'

    },
    {
      id: '2',
      name: 'anshu'

    },
    {
      id: '3',
      name: 'vikash'

    },
    {
      id: '4',
      name: 'sujeet'

    },
    {
      id: '5',
      name: 'sandeep'

    },
    [

      "a", "b", "c", "d"

    ],
    [

      ["1", "2", "3", "4"],
      ["5", "6", "7", "8"]

    ]
  ]

  function showlist() {
    setshowlist(user);
  }

  useEffect(() => {
    showlist();
  }, [])
  
  const arr = [11,22,33,44];


  return (
    <>

      {arr.map((e)=>{
            return(
              <>
                   <h1>{e[0]}</h1>
              </>
            );
      })}





  





      {objects.arr
        .filter(el => el === "1f")
        .map((el, index) => (
          <div key={index}>
            <h1>{el}</h1>
          </div>
        ))}



      {objects?.arr.map((el,index)=>{
          return(
            <>
                 <div key={index}>
                     <h1>{el}---------------------------------------------</h1>
                 </div>
            
            </>
          );
        })}





      <h1>SHOW ALL DATA</h1>



      <h1>{objects.arr}</h1>












      {ahowlist.map((u, index) => {

        if (u.name) {
          return <h2 key={index}>{u.name}</h2>;
        }

        if (u) {
          return <h2 key={index}>{u}</h2>;
        }


        if (Array.isArray(u)) {
          return (
            <div key={index}>
              {u.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          );
        }

        return null;
      })}




    </>
  );
}
export default Loop;