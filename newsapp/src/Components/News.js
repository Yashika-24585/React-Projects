import React, {useState , useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props) {


    const [articles,setArticles] = useState([]);
    // const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [totalResults,setTotalresults] = useState(0);


    const updateNews = async()=> {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f5c154cd50a14bbca80beb59d32a4e12&category=${props.category}&pageSize=${props.pageSize}&page=${page}`;
        let data = await fetch(url);
        props.setProgress(40);
        let parseddata = await data.json();
        props.setProgress(60);
        setArticles(parseddata.articles);
        setTotalresults(parseddata.totalResults);
        // setLoading(false);
        props.setProgress(100);
    }

    const fetchMoreData = async () => {
        console.log("fetch - " + page);
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f5c154cd50a14bbca80beb59d32a4e12&category=${props.category}&pageSize=${props.pageSize}&page=${page+1}`;
        setPage(page+1);
        let data = await fetch(url);
        let parseddata = await data.json();
        setTimeout(() => {

            setArticles(articles.concat(parseddata.articles));
            // setLoading(false)
        }, 1500);
    };

    useEffect(()=>{
        console.log("mount" + page);
        updateNews();
    },[]);

    

    // const handlePreviousclick = async () => {

    //     setPage(page-1);
    //     updateNews();
    //     };

        // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ef732959db0c458f922b3a1c6af4f6ea&category=${props.category}&pageSize=${props.pageSize}&page=${this.state.page - 1}`;
        // let data = await fetch(url);
        // let parseddata = await data.json();

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseddata.articles,
        //     loading: false
        // })
    

    // const handleNextclick = async () => {
    //     setPage(page+1);
    //     updateNews();
    // }

        

        // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ef732959db0c458f922b3a1c6af4f6ea&category=${props.category}&pageSize=${props.pageSize}&page=${this.state.page + 1}`;
        // let data = await fetch(url);
        // let parseddata = await data.json();

        // this.setState({
        //     page: this.state.page + 1,
        //     articles: parseddata.articles,
        //     loading: false
        // })
    

    
        return (
            <div className="container my-4">
                <h3 className="text-center">NewsMonkey - Top {props.category} HeadLines</h3>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={totalResults!==articles.length}
                    loader={<h4><Spinner /></h4>}
                >
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4 d-flex justify-content-evenly" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://www.niddk.nih.gov/-/media/Images/Components/News-And-Meetings/news-generic.png"} newsUrl={element.url} author={element.author} publishedat={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousclick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
                </div> */}
            </div>

        )
            }

