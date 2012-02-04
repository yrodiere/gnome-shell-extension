/* Makes middle-click on a window in overlay mode close it.
 *
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details.
 */
const Workspace = imports.ui.workspace;

/**
 * Adapted from "injectToFunction()", found in
 * 'windowNavigator' Gnome-Shell extension
 * http://git.gnome.org/browse/gnome-shell-extensions/tree/extensions/windowsNavigator/extension.js
 * TODO: find a way to make this generic (using 'arguments' object).
 * 	It's quite ugly to rely on the proxy's signature...
 */
function _addProxyToFunction(parent, name, proxy) {
    parent[name+'_bak'] = parent[name];
    parent[name] = function(actor, event) {
		return proxy.call(this, subject, actor, event);
    }
}

function _removeProxyFromFunction(parent, name) {
	parent[name] = parent[name+'_bak'];
}

function init() {
}

function enable() {
	_addProxyToFunction(Workspace.WindowClone.prototype, '_onButtonRelease',
			function(subject, actor, event) {
				if (event.get_button() == 2) {
					// Middle-click
					this.metaWindow.delete(global.get_current_time());
				} else {
					// Any other button
					return subject.call(this, actor, event);
				}
			}
			);
}

function disable() {
	_removeProxyFromFunction(Workspace.WindowClone.prototype, '_onButtonRelease');
}

