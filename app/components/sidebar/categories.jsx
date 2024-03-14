
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../../../firebase"

function main(category){
    let html = ``
    for (const key in category){
        if(typeof category[key]==='object'){
            html += `
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordian" href="#${key}">
                            <span class="badge pull-right"><i class="fa fa-plus"></i></span>
                            ${key}
                        </a>
                    </h4>
                </div>
                <div id="${key}" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>`
    
            for (const key2 in category[key]){
                html += `<li><a href="/shop/${category.text}/${category[key][key2]}">${category[key][key2]}</a></li>`
            }
            html += ` 
                        </ul>
                    </div>
                </div>
            </div>`
        }else{
            html += `
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"><a href="/shop/${category[key]}">${key}</a></h4>
                    </div>
                </div>
            `
        }
    }
    html += `</div>`
    

    return html
}

export default function Categories(){

    // sessionStorage.removeItem('categories');
    if(sessionStorage.getItem('categories')==null){
        onSnapshot(collection(db, "categories"), (snapshot) => {
            const tmp = {};
            snapshot.forEach((doc) => {
                if(typeof doc.data().array==='object'){
                    tmp[doc.data().text] = {...doc.data().array};
                }
                else{
                    tmp[doc.data().text] = doc.data().array;
                }
            });
            sessionStorage.setItem('categories', JSON.stringify(tmp));
          });
    }
    const category =  JSON.parse(sessionStorage.getItem('categories'))

    
    // console.log(Object.values(data))
    // console.log(Object.keys(data))
    const html = main(category)
    return <div className="panel-group category-products" id="accordian" dangerouslySetInnerHTML={{ __html: html }}></div>

    

    /*
    const renderObjectContent = (cat) => {
        return Object.values(cat).map((key)=>{
            console.log(key)
            if(typeof key === 'object'){
                return (
                    <div key={key} className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href={"#"+key}>
                                <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                {key}
                                </a>
                            </h4>
                        </div>
                        <div id={key} className="panel-collapse collapse">
                            <div className="panel-body">
                                <ul>
                                    {Object.values(key).map((item, index)=>(
                                        <li key={index}><a href="">{item}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={key} className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><a href="#">{key}</a></h4>
                        </div>
                    </div>
                )
            }

        })
    }*/
}