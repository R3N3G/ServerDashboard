import {useEffect, useState} from "react";
import {MoonFill, SunFill} from "react-bootstrap-icons";

const DarkMode = () => {
    const [isDark, setIsDark] = useState<boolean>(false);

    const changeToggle = (state: boolean) => {
        setIsDark(state);
    }

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDark])

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setIsDark(true)
        }
    }, [])

    return (
        <div className={"position-absolute top-0 end-0 p-3 sticky-top"}>
            <div className="form-check form-switch d-flex align-items-center">
                <label className="form-check-label" htmlFor="dark_mode_toggle">
                    {isDark ? <MoonFill size={20}/> : <SunFill size={20}/>}
                </label>
                <input id="dark_mode_toggle" className="form-check-input ms-2" type="checkbox"
                       onChange={e => changeToggle(e.target.checked)} checked={isDark}>
                </input>
            </div>
        </div>
    );
}
export default DarkMode;
