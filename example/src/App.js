import React, { Component } from 'react';
import './initCornerstone';
import { Toolbar, LayoutChooser, LayoutButton, ToolbarSection, StudyBrowser, ThumbnailEntry } from 'react-viewerbase';
import './App.css';

const exampleButtons = [
  {
    command: 'Pan',
    type: 'tool',
    text: 'Pan',
    svgUrl: '/icons.svg#icon-tools-pan',
    active: false,
    onClick: function () { console.log('I have a onclick function') }    
  },
  {
    command: 'Zoom',
    type: 'tool',
    text: 'Zoom',
    svgUrl: '/icons.svg#icon-tools-zoom',
    active: false
  },
  {
    command: 'Bidirectional',
    type: 'tool',
    text: 'Bidirectional',
    svgUrl: '/icons.svg#icon-tools-measure-target',
    active: true
  },
  {
    command: 'StackScroll',
    type: 'tool',
    text: 'Stack Scroll',
    svgUrl: '/icons.svg#icon-tools-stack-scroll',
    active: false
  },
  {
    command: 'reset',
    type: 'command',
    text: 'Reset',
    svgUrl: '/icons.svg#icon-tools-reset',
    active: false
  },
  {
    command: 'Wwwc',
    type: 'tool',
    text: 'Manual',
    svgUrl: '/icons.svg#icon-tools-levels',
    active: false
  },
];

const exampleStudies = [
  {
    thumbnails: [
      {
        imageSrc: 'https://raw.githubusercontent.com/crowds-cure/cancer/master/public/screenshots/Anti-PD-1_Lung.jpg',
        seriesDescription: 'Anti-PD-1_Lung',
        active: true,
        seriesNumber: 2,
        numImageFrames: 512,
        stackPercentComplete: 30
      }, {
        imageSrc: 'https://raw.githubusercontent.com/crowds-cure/cancer/master/public/screenshots/Anti-PD-1_MELANOMA.jpg',
        seriesDescription: 'Anti-PD-1_MELANOMA',
        seriesNumber: 2,
        instanceNumber: 1,
        numImageFrames: 256,
        stackPercentComplete: 70
      }
    ]
  }, {
    thumbnails: [
      {
        imageSrc: 'https://raw.githubusercontent.com/crowds-cure/cancer/master/public/screenshots/CPTAC-GBM.jpg',
        seriesDescription: 'CPTAC-GBM',
        active: true,
        seriesNumber: 2,
        numImageFrames: 512,
        stackPercentComplete: 100
      }, {
        imageSrc: 'https://raw.githubusercontent.com/crowds-cure/cancer/master/public/screenshots/CPTAC-CM.jpg',
        seriesDescription: 'CPTAC-CM',
        seriesNumber: 2,
        instanceNumber: 1,
        numImageFrames: 256
      }, {
        imageSrc: 'https://raw.githubusercontent.com/crowds-cure/cancer/master/public/screenshots/CPTAC-HNSCC.jpg',
        seriesDescription: 'CPTAC-HNSCC',
        seriesNumber: 2,
        instanceNumber: 1,
        numImageFrames: 256
      }, {
        imageSrc: 'https://raw.githubusercontent.com/crowds-cure/cancer/master/public/screenshots/CPTAC-LSCC.jpg',
        seriesDescription: 'CPTAC-LSCC',
        seriesNumber: 2,
        instanceNumber: 1,
        numImageFrames: 256
      }
    ]
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studyBrowserDropResults: '',
      buttons: exampleButtons
    }    
    this.onThumbnailDoubleClick = this.onThumbnailDoubleClick.bind(this);
    this.onThumbnailClick = this.onThumbnailClick.bind(this);
    this.onThumbnailDrag = this.onThumbnailDrag.bind(this);
    this.resetDragEffects = this.resetDragEffects.bind(this);
    this.ChangeLayout = this.ChangeLayout.bind(this);
  }  
  resetDragEffects() {
    const targetClass = 'study-drop-area';
    const hoverClass = 'hovered';
  
    // Remove any current hovered effects on viewports
    const hovered = document.querySelector(`.${targetClass}.${hoverClass}`);
    if (hovered) {
      hovered.classList.remove(hoverClass);
    }    
    document.body.style.cursor = 'no-drop';
  }
  onThumbnailDrag(event) {
    const targetClass = 'study-drop-area';
    const hoverClass = 'hovered';
  
    const elemBelow = ThumbnailEntry.getDropElement(event);
  
    // If none exists, stop here
    if (!elemBelow) {
      this.resetDragEffects();
      return;
    }
  
    // Figure out what to do depending on what we're dragging over
    const elementIsInsideTarget = elemBelow.closest(`.${targetClass}`);
  
    // If what we are dragging over is not the target or one of it's children, stop here
    if (!elementIsInsideTarget) {
      this.resetDragEffects();
      return;
    }
    // If we are inside the target, add the hover class
    const target = elemBelow.closest(`.${targetClass}`);
    target.classList.add(hoverClass);
    // Update the cursor to something that indicates to the user that we can drop here
    document.body.style.cursor = 'copy';
  }
  onThumbnailClick() {
    console.warn('onThumbnailClick');
    console.warn(this);
  }
  onThumbnailDoubleClick() {
    console.warn('onThumbnailDoubleClick');
    console.warn(this);
  }
  onThumbnailDrop = (event, data) => {
    const targetClass = 'study-drop-area';
    const hoverClass = 'hovered';
    
    // Reset the cursor
    document.body.style.cursor = 'auto';

    const hovered = document.querySelector(`.${targetClass}.${hoverClass}`);
    if (hovered) {
      hovered.classList.remove(hoverClass);
    }

    const elemBelow = ThumbnailEntry.getDropElement(event);
  
    // If none exists, stop here
    if (!elemBelow) {
        return;
    }
  
    // Figure out what to do depending on what we're dragging over
    const elementIsInsideTarget = elemBelow.closest(`.${targetClass}`)
    if (elementIsInsideTarget) {
      this.setState({
        studyBrowserDropResults: JSON.stringify(data, null, 2)
      })
    }
  }
  ChangeLayout(currentCell) {    
      this.setState({
        currentCell
      });    
  }

  render () {
    return (
      <div className="container">
      <div className="row">
        <h2>React Imaging Application Components</h2>
      </div>
        <div className="row">
          <div className='col-xs-12'>
            <h4>What is this?</h4>
            <p>A set of re-usable components for build medical imaging applications. We use these to build the <a href="http://ohif.org" target="_blank" rel="noopener noreferrer">OHIF Viewer</a>.
            </p>
          </div>
          <hr></hr>
        </div>
        <div className="row">
          <h2>Examples</h2>
          <div className="row" style={{height: "150px"}}>
            <div className='col-xs-12 col-lg-6'>
              <h3>Layout Button {this.state.currentCell && ` I changed layout to ${this.state.currentCell.row+1} to ${this.state.currentCell.col+1}`}</h3>
              <p>Used to choose which layout to place the viewer into.</p>
            </div>
            <div className="row">
              <div className='col-xs-2 col-lg-6'>
                <LayoutButton onChange={this.ChangeLayout}/>
              </div>
              <div className='col-xs-10 col-lg-6'>
                <LayoutChooser rows={3} columns={3} onChange={this.ChangeLayout}/>
              </div>                            
              </div> 
          </div>                     
      
          <div className="row">
            <div className='col-xs-12 col-lg-6'>
              <h3>Toolbar Section</h3>
              <p>A basic row of buttons for a toolbar.</p>
            </div>
            <div className='col-xs-12 col-lg-6'>
              <ToolbarSection buttons={this.state.buttons}/>
            </div>
          </div>
          <div className="row">
            <div className='col-xs-12 col-lg-6'>
              <h3>Study Browser</h3>
              <p>A simple scrollable list of image sets. Users can drag/drop data from here into a panel in the layout.</p>
              <div className='study-drop-area'>
                <h4>Drag / Drop something from the Study Browser here</h4>
                <span className='study-drop-results'>{this.state.studyBrowserDropResults}</span>
              </div>
            </div>
            <div className='col-xs-12 col-lg-6' style={{height: "512px"}}>
              <StudyBrowser
                studies={exampleStudies}
                onThumbnailClick={this.onThumbnailClick}
                onThumbnailDoubleClick={this.onThumbnailDoubleClick}
                onThumbnailDrag={this.onThumbnailDrag}
                onThumbnailDrop={this.onThumbnailDrop}
                />
            </div>
          </div>
          <div className="row">
            <div className='col-xs-12 col-lg-6'>
              <h3>Toolbar</h3>
              <p>A basic row of buttons for a toolbar.</p>
            </div>
            <div className='col-xs-12 col-lg-6'>
              <Toolbar buttons={this.state.buttons}/>
            </div>
          </div>
          <div className="row">
            <div className='col-xs-12 col-lg-6'>
            </div>
            </div>
        </div>
      </div>
    )
  }
}