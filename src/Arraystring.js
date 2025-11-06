const Arraystring = () => {
  const username = "harshalHarshainkyanaHi";
  
  // Split string → lowercase each letter → filter only 'h'
  const fill = username
    .toLowerCase() // ✅ make all lowercase first
    .split("")     // ✅ split into characters
    .filter((f) => f === "h"); // ✅ return only 'h' letters

  console.log(fill); // ["h", "h", "h"]
    const reducer = ()=>{
      
    }

  return (
    <>
      {fill.map((e, i) => (
        <h1 key={i}>{e}</h1>
      ))}
    </>
  );
};

export default Arraystring;
