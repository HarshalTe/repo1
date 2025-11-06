import Show from "./Show";
const AO = () => {
    const array = [
        "apple",
        "banana",
        "papaya",
        "grapes",
        {
            objects1: "ob1",
            objects2: "ob2",

        }

    ]
    const objects = {
        arrob: [1, 2, 3, 4],
        userdata: {
            age: 20,
            name: 'ajay',
            arob2: ["a", "b", "c", "d",
                {
                    ao: ""
                }
            ]
        }
    }




    return (<>

        <Show objects={objects} array={array} />

    </>);
}
export default AO;