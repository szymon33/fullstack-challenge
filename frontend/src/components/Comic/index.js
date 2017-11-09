import React, { Component } from 'react';
import './Comic.css';

export default class Comic extends Component {
  constructor(props) {
    super(props);
  }

  coverImage() {
    return `${this.props.thumbnail.path}/portrait_incredible.${this.props.thumbnail.extension}`;
  }

  renderGallery(images) {
    let size = images.length;
    if (size === 0) return null;

    let result = images.map((image) => {
      let imageUrl = image.path + "/" + "portrait_fantastic." + image.extension;
      return(
        <div className={"pure-u-1-" + size }>
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
          <span className="back">Click anywhere to back to the comics</span>
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
              <img className="pure-img" src={ this.coverImage.call(this) } alt={ this.props.title } />
            </div>
          </div>
          <div className="pure-u-2-3 desc">
            <h1>{this.props.title}</h1>
            <br />
            <strong>Issue Number:&nbsp;</strong>
            {this.props.issueNumber}
            <br />
            <strong>Variant Description:&nbsp;</strong>
            {this.props.variantDescription}
            <br />
            <strong>ISBN:&nbsp;</strong>
            {this.props.isbn}
            <br />
            { this.renderCreators(this.props.creators) }
            { this.renderGallery(this.props.images) }
          </div>
        </div>
        <br />
      </div>);
  }
}
