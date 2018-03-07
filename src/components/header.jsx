import React, { Component } from 'react';

const electron = window.require('electron');
const windowScreen = electron.remote.getCurrentWindow();

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMaximized: false,
      bounds: {}
    };
  }
  onMinimizeClick() {
    windowScreen.minimize();
  }
  onMaximizeClick() {
    if (this.state.isMaximized) {
      const bounds = this.state.bounds;
      windowScreen.setSize(bounds.width, bounds.height);
      windowScreen.center();
      this.setState({
        isMaximized: false
      });
    } else {
      this.setState({
        isMaximized: true,
        bounds: windowScreen.getBounds()
      });
      windowScreen.maximize();
    }
  }
  onCloseWindowClick() {
    windowScreen.hide();
  }
  render() {
    return (
      <div className='app-header'>
        <div className='app-header-logo' />
        <div className='app-header-bar'>
          <i className='app-header-bar-item icon iconfont icon-zuixiaohua' onClick={() => this.onMinimizeClick()} />
          <i className='app-header-bar-item icon iconfont icon-quanping' onClick={() => this.onMaximizeClick()} />
          <i className='app-header-bar-item icon iconfont icon-guanbi' onClick={() => this.onCloseWindowClick()} />
        </div>
      </div>
    );
  }
}

export default Header;
