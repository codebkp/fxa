/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Device information
 */

import Backbone from 'backbone';

var AttachedClient = Backbone.Model.extend({
  defaults: {
    approximateLastAccessTime: null,
    approximateLastAccessTimeFormatted: null,
    clientId: null,
    clientType: null,
    createdTime: null,
    createdTimeFormatted: null,
    deviceId: null,
    deviceType: null,
    genericOS: null,
    id: null,
    isCurrentSession: false,
    lastAccessTime: null,
    lastAccessTimeFormatted: null,
    location: null,
    // Set the default name in case the name is blank.
    // XXX TODO: this model is now generic, should we say t("Unknown client") or similar?
    name: 'Firefox',
    refreshTokenId: null,
    scope: null,
    sessionTokenId: null,
    userAgent: null
  },

  destroy () {
    // Both a sessionToken and deviceId are needed to destroy a device. An account `has a` device, therefore account
    // destroys the device.
    //
    // XXX TODO: the above comment was copied from the `Device model and doesn't seem quite right to me. It suggests to
    // me that the account will destroy the device in response to observing a 'destroy' notification on the model, but
    // AFAICT that's not what happens in practice. It's true that the account destroys the device, but it does so
    // *before* this notification is triggered, and it triggers this notification as a side-effect. So I'm not entirely
    // sure what this is about...
    //
    this.trigger('destroy', this);
  }
});

export default AttachedClient;
