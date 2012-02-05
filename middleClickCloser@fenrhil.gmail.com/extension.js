/* Makes middle-click on a window in overlay mode close it.
 *
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details.
 */
const Workspace = imports.ui.workspace;
original_subject = undefined;

/**
 * Adapted from "injectToFunction()", found in
 * 'windowNavigator' Gnome-Shell extension
 * http://git.gnome.org/browse/gnome-shell-extensions/tree/extensions/windowsNavigator/extension.js
 * TODO: find a way to make this generic (using 'arguments' object).
 * 	It's quite ugly to rely on the proxy's signature...
 */
function _addProxyToFunction(parent, name, proxy) {
    original_subject = parent[name];
    parent[name] = function(action, actor) {
		return proxy.call(this, original_subject, action, actor);
    }
}

function _removeProxyFromFunction(parent, name) {
	parent[name] = original_subject;
}

function init() {
}

function enable() {
	_addProxyToFunction(Workspace.WindowClone.prototype, '_onClicked',
			function(subject, action, actor) {
				//global.log("Button: " + action.get_button());
				if (action.get_button() == 2) {
					// Middle-click
					this.metaWindow.delete(global.get_current_time());
				} else {
					// Any other button
					return subject.call(this, action, actor);
				}
			}
		);
}

function disable() {
	_removeProxyFromFunction(Workspace.WindowClone.prototype, '_onClicked');
}

