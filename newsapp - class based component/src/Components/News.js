import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    // articles = [
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "CyberScoop"
    //         },
    //         "author": "<a href=\"https://cyberscoop.com/author/tonya-riley/\" class=\"\" title=\"Tonya Riley\" rel=\"author\">Tonya Riley</a>",
    //         "title": "A year after outcry, IRS still doesn’t offer taxpayers alternative to ID.me",
    //         "description": "The agency sparked controversy over its decision to deploy facial recognition technology from the company to vet taxpayers' identity.",
    //         "url": "https://cyberscoop.com/irs-facial-recognition-identity-privacy/",
    //         "urlToImage": "https://cyberscoop.com/wp-content/uploads/sites/3/2023/02/GettyImages-124this.props.pagesize514121.jpg",
    //         "publishedAt": "2023-02-10T02:29:05Z",
    //         "content": "Skip to main content\r\nClose\r\nThe agency sparked controversy over its decision to deploy facial recognition technology from the company to vet taxpayers' identity. \r\nWhen the IRS announced last year t… [+10110 chars]"
    //     }]

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.props.apiKey}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        let data = await fetch(url);
        this.props.setProgress(40);
        let parseddata = await data.json();
        this.props.setProgress(60);
        this.setState({
            articles: parseddata.articles,
            totalResults: parseddata.totalResults,
            loading: false,
            page:this.state.page+1
        })
        this.props.setProgress(100);
    }

    fetchMoreData = async () => {
        console.log("fetch - " + this.state.page);
        this.setState({page:this.state.page+1})
        console.log("fetch" + this.state.page);
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.props.apiKey}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        let data = await fetch(url);
        let parseddata = await data.json();
        setTimeout(() => {
            this.setState({
                articles: this.state.articles.concat(parseddata.articles),
                loading: false
            });
        }, 1500);
    };

    async componentDidMount() {
        console.log("mount" + this.state.page);
        this.updateNews();
    }

    handlePreviousclick = async () => {

        this.setState({
            page: this.state.page - 1
        })

        this.updateNews();
        // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ef732959db0c458f922b3a1c6af4f6ea&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
        // let data = await fetch(url);
        // let parseddata = await data.json();

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseddata.articles,
        //     loading: false
        // })
    }

    handleNextclick = async () => {

        this.setState({
            page: this.state.page + 1
        })

        this.updateNews();

        // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ef732959db0c458f922b3a1c6af4f6ea&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
        // let data = await fetch(url);
        // let parseddata = await data.json();

        // this.setState({
        //     page: this.state.page + 1,
        //     articles: parseddata.articles,
        //     loading: false
        // })
    }

    render() {
        return (
            <div className="container my-4">
                <h3 className="text-center">NewsMonkey - Top {this.props.category} HeadLines</h3>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.totalResults!==this.state.articles.length}
                    loader={<h4><Spinner /></h4>}
                >
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4 d-flex justify-content-evenly" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://www.niddk.nih.gov/-/media/Images/Components/News-And-Meetings/news-generic.png"} newsUrl={element.url} author={element.author} publishedat={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousclick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
                </div> */}
            </div>

        )
    }
}
