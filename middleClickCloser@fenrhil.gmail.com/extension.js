// Makes middle-click on a window in overlay mode close it.
const Workspace = imports.ui.workspace;

/**
 * Adapted from "injectToFunction()", found in
 * 'windowNavigator' Gnome-Shell extension
 * http://git.gnome.org/browse/gnome-shell-extensions/tree/extensions/windowsNavigator/extension.js
 * TODO: find a way to make this generic (using 'arguments' object).
 * 	It's quite ugly to rely on the proxy's signature...
 */
function _addProxyToFunction(parent, name, proxy) {
    let subject = parent[name];
    parent[name] = function(actor, event) {
		return proxy.call(this, subject, actor, event);
    }
}

function main() {
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

