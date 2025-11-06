import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "././Redux/counterslice"
import { useEffect,  useState } from "react";

const Opration = () => {
    const countdata = useSelector((state) => state.counter.count);

    
    const dispatch = useDispatch();
    const [timer, setimer] = useState(0);
    useEffect(() => {
        const ch1 = setInterval(() => {
            setimer((timer) => timer + 1)
        }, 1000);

        return () => {
            clearInterval(ch1)
        }
    }, [])
    return (
        <>
            <h1>{countdata > 0 ? countdata : 0}  </h1>
            <button onClick={() => {
                dispatch(increment())
            }}>plus</button>
            <button onClick={() => {
                if (countdata > 0) {
                    dispatch(decrement())
                }
            }}>minus</button>
            <br></br>
            <h1>{timer}</h1>

        </>
    );
}
export default Opration;