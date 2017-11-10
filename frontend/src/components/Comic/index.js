import React, { Component } from 'react';
import './Comic.css';

export default class Comic extends Component {
  constructor(props) {
    super(props);
  }

  coverImage() {
    return `${this.props.comicData.thumbnail.path}/portrait_incredible.${this.props.comicData.thumbnail.extension}`;
  }

  renderGallery(images) {
    if (images.length === 0) return null;

    let result = images.map((image) => {
      let imageUrl = image.path + "/" + "portrait_fantastic." + image.extension;
      return(
        <div className={"pure-u-1-4"}>
          <div className="gallery-item">
            <img className="pure-img" src={imageUrl} />
          </div>
        </div>
      );
    });

    return(
      <div className="pure-g">
        <div className="pure-u-1">
          <strong>Image Gallery:</strong>
        </div>
        <br />
        { result }
        <br />
      </div>
    )
  }

  renderCreators(creators) {
    if (creators === {} || creators.items === []) return null;

    let result = creators.items.map((creator) => {
      return(
        <div className="pure-u-1">
          <strong>{creator.role}&nbsp;</strong>
          <a href={creator.resourceURI} target="_blank">{creator.name}</a>
          <br />
        </div>
      );
    });

    return(
      <div className="pure-g">
        { result }
      </div>
    );
  }

  renderNavigation() {
    return(
      <div className="navigation pure-g">
        <div className="pure-u-1">
          <span className="back">Click anywhere to go back to the list</span>
        </div>
      </div>);
  }

  render() {
    return (
      <div className="comic" onClick={ this.props.hide.bind(this) }>
        { this.renderNavigation() }
        <div className="pure-g">
          <div className="pure-u-1-3">
            <div className="cover-show">
              <img className="pure-img" src={ this.coverImage.call(this) } alt={ this.props.comicData.title } />
            </div>
          </div>
          <div className="pure-u-2-3 desc">
            <h1>{this.props.comicData.title}</h1>
            <br />
            <strong>Issue Number:&nbsp;</strong>
            {this.props.comicData.issueNumber}
            <br />
            <strong>Variant Description:&nbsp;</strong>
            {this.props.comicData.variantDescription}
            <br />
            <strong>ISBN:&nbsp;</strong>
            {this.props.comicData.isbn}
            <br />
            { this.renderCreators(this.props.comicData.creators) }
            { this.renderGallery(this.props.comicData.images) }
          </div>
        </div>
        <br />
      </div>);
  }
}
