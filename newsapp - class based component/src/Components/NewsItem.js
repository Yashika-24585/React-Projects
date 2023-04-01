import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {

    let {title , description , imageUrl , newsUrl,author,publishedat,source} = this.props
    return (
      <>
        <div className = "my-4">
        <div className="card" style={{width: "18rem"}}>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:"1" , left : "90%"}} >{source}</span>
        <img  style={{height: "12rem"}} src={imageUrl} className="card-img-top" alt="..."/>
        <div style={{minheight:"13rem",paddingBottom : "14px"}} className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}....</p>
          <p className="card-text" style={{marginBottom : "0.2rem"}}>Author: <small className="text-muted">{author?author:"Unknown"}</small></p>
          <p className="card-text">Published On: <small className="text-muted">{new Date(publishedat).toUTCString()}</small></p>
          <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
      </div>
      </>
    )
  }
}
