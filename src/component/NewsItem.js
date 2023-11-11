import React from 'react';

const NewsItem = (props) => {
    
        let {title, description, imageUrl, newsUrl, author, date, source} = props;

        return(
            <div>
                <div className="card my-3"  >
                    <div>
                    <span className="badge rounded-pill bg-danger" style={{display:'flex', justifyContent:'flex-end', right:'0', position:'absolute'}}>
                        {source}
                    </span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>   
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">by {!author?'unknown':author} on {new Date(date).toGMTString()}</small></p>

                        <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }
export default NewsItem;