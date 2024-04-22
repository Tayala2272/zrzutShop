import { AppContext } from "../../hooks/firebaseContext";

import { Link } from "react-router-dom";

function Main({ category, lang }) {
    // Transforming each category into a JSX element

    return Object.entries(category).map(([key, value]) => {
        console.log(key, value)
        if (typeof value.arrayEN === 'object') {
            return (
                <div className="panel panel-default" key={key}>
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordian" href={`#${key}`}>
                                <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                {lang == "en" && value.textEN}
                                {lang == "pl" && value.textPL}
                                {lang == "ua" && value.textUA}
                            </a>
                        </h4>
                    </div>
                    <div id={key} className="panel-collapse collapse">
                        <div className="panel-body">
                            <ul>
                                {lang == "en" && Object.entries(value.arrayEN).map(([key2, name]) => (
                                    <li key={key2}><Link to={`/shop/${key}/${value.arrayEN[key2]}`}>{name}</Link></li>
                                ))}
                                {lang == "pl" && Object.entries(value.arrayPL).map(([key2, name]) => (
                                    <li key={key2}><Link to={`/shop/${key}/${value.arrayEN[key2]}`}>{name}</Link></li>
                                ))}
                                {lang == "ua" && Object.entries(value.arrayUA).map(([key2, name]) => (
                                    <li key={key2}><Link to={`/shop/${key}/${value.arrayEN[key2]}`}>{name}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="panel panel-default" key={key}>
                    <div className="panel-heading">
                        <h4 className="panel-title"><Link to={`/shop/${key}`}>{lang == "en" && value.textEN}{lang == "pl" && value.textPL}{lang == "ua" && value.textUA}</Link></h4>
                    </div>
                </div>
            );
        }
    })

}

export default function Categories() {
    const { category, lang } = AppContext();
    
    
    return (
        <div className="panel-group category-products" id="accordian">
            {category && <Main category={category} lang={lang}/>}
        </div>
    );
}