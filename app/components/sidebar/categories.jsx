
import { Link } from "react-router-dom";
import { AppContext } from "../../hooks/firebaseContext";

function CategoryItem({ category }) {
  return Object.entries(category).map(([key, value]) => {
    if (typeof value === 'object') {
      return (
        <div className="panel panel-default" key={key}>
          <div className="panel-heading">
            <h4 className="panel-title">
                <a data-toggle="collapse" data-parent="#accordian" href={`#${key}`}>
                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                    {key}
                </a>
            </h4>
          </div>
          <div id={key} className="panel-collapse collapse">
            <div className="panel-body">
              <ul>
                {Object.values(value).map((item, index) => (
                    <li key={index}><Link to={`/shop/${key}/${item}`}>{item}</Link></li>
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
            <h4 className="panel-title"><Link to={`/shop/${value}`}>{key}</Link></h4>
          </div>
        </div>
      );
    }
  });
}

export default function Categories() {
  const { category } = AppContext();

  return (
    <div className="panel-group category-products" id="accordian">
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title"><Link to={`/shop`}>Wszystkie</Link></h4>
            </div>
        </div>
        <CategoryItem category={category} />
    </div>
  );
}