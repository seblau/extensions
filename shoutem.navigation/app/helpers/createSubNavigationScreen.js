import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Screen } from '@shoutem/ui';

import { actions, getFirstShortcut } from 'shoutem.application';

import { NavigationBar } from '../components/ui';

import {
  mapExtensionSettingsToProps,
  shortcutChildrenRequired,
} from './index';

const { bool, string, object } = PropTypes;

const resolveStyleName = (props) => {
  const {
    isRootScreen,
    navigationBarImage,
  } = props;

  if (navigationBarImage) {
    return 'clear';
  }

  return (isRootScreen) ? 'clear none' : '';
};

export default function createSubNavigationScreen(Component) {
  class FolderBaseScreen extends PureComponent {
    static propTypes = {
      firstShortcut: object,
      shortcut: object,
      navigationBarImage: string,
      backgroundImageEnabledFirstScreen: bool,
      showTitle: bool,
      fitContainer: bool,
    };

    constructor(props) {
      super(props);

      this.isRootScreen = props.firstShortcut === props.shortcut;
    }

    resolveNavBarProps() {
      const {
        backgroundImageEnabledFirstScreen: bgImageEnabled,
        navigationBarImage: navBarImage,
        showTitle,
        shortcut,
        fitContainer,
      } = this.props;

      const navigationBarImage = (!bgImageEnabled && !this.isRootScreen) ? null : navBarImage;
      const title = (navigationBarImage && !showTitle) ? null : _.get(shortcut, 'title', '');
      const styleName = (navigationBarImage && 'clear') || (this.isRootScreen && 'clear none') || '';

      return {
        navigationBarImage,
        title,
        styleName,
        fitContainer,
      };
    }

    resolveScreenProps() {
      return {
        // Main Navigation Screens does not have NavigationBar, so when Folder screen is Main
        // navigation screen (and has no NavigationBar) stretch screen.
        onLayout: this.layoutChanged,
        styleName: this.isRootScreen ? 'full-screen' : '',
      };
    }

    render() {
      return (
        <Screen {...this.resolveScreenProps()}>
          <NavigationBar {...this.resolveNavBarProps()} />
          <Component {...this.props} />
        </Screen>
      );
    }
  }

  const mapStateToProps = (state) => ({
    firstShortcut: getFirstShortcut(state),
    ...mapExtensionSettingsToProps(state),
  });

  const mapDispatchToProps = {
    executeShortcut: actions.executeShortcut,
  };

  return shortcutChildrenRequired(
    connect(mapStateToProps, mapDispatchToProps)(FolderBaseScreen)
  );
}
