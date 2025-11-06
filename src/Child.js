const Child = () => {
  const arr = [
    "a",
    { name1: "harshal", inner: [1, 2, 3] },
    1,
    "harshal"
  ];

  return (
    <>
      {arr
        .filter((item) => typeof item !== "object")
        .map((e, i) => (
          <div key={i}>{e}</div>
        ))}
    </>
  );
};
export default Child;
