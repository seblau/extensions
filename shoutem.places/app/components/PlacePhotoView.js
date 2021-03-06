import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  Caption,
  ImageBackground,
  Divider,
  Tile,
  Title,
  View,
} from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';
import { Favorite } from 'shoutem.favorites';
import { ext } from '../const';
import withOpenPlaceDetails from '../shared/withOpenPlaceDetails';

export class PlacePhotoView extends PureComponent {
  static propTypes = {
    place: PropTypes.object.isRequired,
    onPress: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      schema: ext('places'),
    };
  }

  render() {
    const { place, onPress } = this.props;
    const { schema } = this.state;
    const { location = {} } = place;
    const { formattedAddress = '' } = location;
    const imageSource = place.image ? { uri: place.image.url } : undefined;

    return (
      <TouchableOpacity
        onPress={onPress}
      >
        <Divider styleName="line" />
        <ImageBackground
          styleName="large-banner placeholder"
          source={imageSource}
        >
          <Tile>
            <View virtual styleName="actions">
              <Favorite
                item={place}
                schema={schema}
              />
            </View>
            <Title styleName="vertical" numberOfLines={2}>{place.name.toUpperCase()}</Title>
            <Caption styleName="vertical">{formattedAddress}</Caption>
          </Tile>
        </ImageBackground>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }
}

const styledComponent = connectStyle(ext('PlacePhotoView'))(PlacePhotoView);

export default withOpenPlaceDetails(styledComponent);
