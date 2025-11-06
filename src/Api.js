import { useEffect, useState } from "react";

const Api = () => {
  const [show, setShow] = useState([]);






  const api = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const result = await response.json();
      setShow(result);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    api();
  }, []);

  return (
    <div>
      <table border="1"  cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {show.map((ele) => (
            <tr key={ele.id}>
              <td>{ele.title}</td>
              <td>{ele.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Api;
