import {useEffect, useState} from "react";
import {MoonFill, SunFill} from "react-bootstrap-icons";
import ReactTooltip from "react-tooltip";

const DarkModeSwitch = () => {
    const [isDark, setIsDark] = useState<boolean>(false);

    const changeToggle = (state: boolean) => {
        setIsDark(state);
    };

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDark]);

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setIsDark(true)
        }
    }, []);

    return (
        <div className="form-check form-switch ps-0 d-flex align-items-center">
            <label className="form-check-label btn pe-0 text-dark" htmlFor="dark_mode_toggle"
                   data-tip="" data-for="darkModeTip">
                {isDark ? <MoonFill size={25}/> : <SunFill size={25}/>}
            </label>
            <input hidden id="dark_mode_toggle" className="form-check-input ms-2" type="checkbox"
                   onChange={e => changeToggle(e.target.checked)} checked={isDark}>
            </input>
            <ReactTooltip id="darkModeTip" place="top" effect="solid">
                {isDark ? "Dark" : "Light"}
            </ReactTooltip>
        </div>
    );
}
export default DarkModeSwitch;
