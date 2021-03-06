/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule TimePickerAndroidExample
 */
'use strict';

var React = require('React');
var ReactNative = require('react-native');
var {
  TimePickerAndroid,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} = ReactNative;

var RNTesterBlock = require('./RNTesterBlock');
var RNTesterPage = require('./RNTesterPage');

class TimePickerAndroidExample extends React.Component {
  static title = 'TimePickerAndroid';
  static description = 'Standard Android time picker dialog';

  state = {
    isoFormatText: 'pick a time (24-hour format)',
    presetHour: 4,
    presetMinute: 4,
    presetText: 'pick a time, default: 4:04AM',
    simpleText: 'pick a time',
    clockText: 'pick a time',
    spinnerText: 'pick a time',
    defaultText: 'pick a time',
  };

  showPicker = async (stateKey, options) => {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      var newState = {};
      if (action === TimePickerAndroid.timeSetAction) {
        newState[stateKey + 'Text'] = _formatTime(hour, minute);
        newState[stateKey + 'Hour'] = hour;
        newState[stateKey + 'Minute'] = minute;
      } else if (action === TimePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  render() {
    return (
      <RNTesterPage title="TimePickerAndroid">
        <RNTesterBlock title="Simple time picker">
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'simple', {})}>
            <Text style={styles.text}>{this.state.simpleText}</Text>
          </TouchableWithoutFeedback>
        </RNTesterBlock>
        <RNTesterBlock title="Simple clock time picker">
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'clock', {mode: 'clock'})}>
            <Text style={styles.text}>{this.state.clockText}</Text>
          </TouchableWithoutFeedback>
        </RNTesterBlock>
        <RNTesterBlock title="Simple spinner time picker">
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'spinner', {mode: 'spinner'})}>
            <Text style={styles.text}>{this.state.spinnerText}</Text>
          </TouchableWithoutFeedback>
        </RNTesterBlock>
        <RNTesterBlock title="Simple default time picker">
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'default', {mode: 'default'})}>
            <Text style={styles.text}>{this.state.defaultText}</Text>
          </TouchableWithoutFeedback>
        </RNTesterBlock>
        <RNTesterBlock title="Time picker with pre-set time">
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'preset', {
              hour: this.state.presetHour,
              minute: this.state.presetMinute,
            })}>
            <Text style={styles.text}>{this.state.presetText}</Text>
          </TouchableWithoutFeedback>
        </RNTesterBlock>
        <RNTesterBlock title="Time picker with 24-hour time format">
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'isoFormat', {
              hour: this.state.isoFormatHour,
              minute: this.state.isoFormatMinute,
              is24Hour: true,
            })}>
            <Text style={styles.text}>{this.state.isoFormatText}</Text>
          </TouchableWithoutFeedback>
        </RNTesterBlock>
      </RNTesterPage>
    );
  }
}

/**
 * Returns e.g. '3:05'.
 */
function _formatTime(hour, minute) {
  return hour + ':' + (minute < 10 ? '0' + minute : minute);
}

var styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

module.exports = TimePickerAndroidExample;

