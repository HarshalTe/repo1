import { useState } from "react";

const Upload = () => {

    const [information, setinformation] = useState(
        {
            name: '',
            images: []
        }
    );

    const [showlist, setshowlist] = useState([]);

    const handlechange = (e) => {
        setinformation({ ...information, [e.target.name]: e.target.value });
        console.log("information" + JSON.stringify(information));
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        setshowlist([...showlist, information]);
    }
    return (<>
        <h1>Upload Images</h1>
        <form onSubmit={handlesubmit}>
            <input type="text" placeholder="Enter Name" value={information.name} name="name" onChange={handlechange} />
            <input type="file" multiple placeholder="Upload Images" value={information.images} name="images" onChange={handlechange} />
            <button type="submit">SUBMIT</button>
        </form>
        {showlist.map((ele, index) => {
            return (<>
                <div key={index}>
                    <h1>{ele.name}</h1>
                    <h1>{ele.images}</h1>
                </div>
            </>)
        })}
    </>);
}
export default Upload;