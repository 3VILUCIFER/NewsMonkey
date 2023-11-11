import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import PropsTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner'


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0); 
    // document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey`

    const updateNews = async () => {
      props.setProgress(10);
      let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a922618425514279935604fb28fa4740&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      console.log(parsedData);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    }

    useEffect(()=>{
      updateNews();
      // eslint-disable-next-line
    },[])
  
    const fetchMoreData = async () => {
     let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a922618425514279935604fb28fa4740&page=${page+1}&pageSize=${props.pageSize}`;
     setPage(page+1);
     let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
   
    };

    
        return(
            <>
                <h1 className='text-center' style={{margin:'35px 0px', marginTop: '80px'}}>NewsMonkey -  Top {props.category.charAt(0).toUpperCase()+props.category.slice(1)} Headlines</h1>
                {loading && <Spinner/>}

                <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
                >
                  <div className='container'>
                    <div  className='row'>
                        {articles.map((element)=>{
                            return <div className='col-md-4' key={element.url}>
                            <NewsItem imageUrl={!element.urlToImage?'https://bsmedia.business-standard.com/_media/bs/img/article/2023-10/27/full/1698382069-8611.jpg':element.urlToImage} newsUrl={element.url} title={element.title ? element.title :''} description={element.description ? element.description :''} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                        })} 
                    </div>
                    </div>
                 </InfiniteScroll>
                    
                </>
        )
    }
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category:'general'
}

News.propTypes = {
  country: PropsTypes.string, 
  category: PropsTypes.string, 
  pageSize: PropsTypes.number
}
export default News;