var HotKeys = function( $ ) {
	var hotKeysHandlers = {};

	var keysDictionary = {
		d: 68,
		l: 76,
		s: 83,
		p: 80,
		del: 46
	};

	var isMac = function() {
		return -1 !== navigator.userAgent.indexOf( 'Mac OS X' );
	};

	var isControlEvent = function( event ) {
		return event[ isMac() ? 'metaKey' : 'ctrlKey' ];
	};

	var initHotKeysHandlers = function() {
		hotKeysHandlers[ keysDictionary.d ] = {
			duplicateElement: {
				isWorthHandling: function( event ) {
					return isControlEvent( event );
				},
				handle: function() {
					var panel = elementor.getPanelView();

					if ( 'editor' !== panel.getCurrentPageName() ) {
						return;
					}

					panel.getCurrentPageView().getOption( 'editedElementView' ).duplicate();
				}
			}
		};

		hotKeysHandlers[ keysDictionary.s ] = {
			saveEditor: {
				isWorthHandling: function( event ) {
					return isControlEvent( event );
				},
				handle: function() {
					elementor.getPanelView().getFooterView()._publishBuilder();
				}
			}
		};

		hotKeysHandlers[ keysDictionary.p ] = {
			changeEditMode: {
				isWorthHandling: function( event ) {
					return isControlEvent( event );
				},
				handle: function() {
					elementor.getPanelView().modeSwitcher.currentView.toggleMode();
				}
			}
		};

		hotKeysHandlers[ keysDictionary.l ] = {
			showTemplateLibrary: {
				isWorthHandling: function( event ) {
					return isControlEvent( event ) && event.shiftKey;
				},
				handle: function() {
					elementor.templates.showTemplatesModal();
				}
			}
		};

		hotKeysHandlers[ keysDictionary.del ] = {
			/* Waiting for CTRL+Z / CTRL+Y
			deleteElement: {
				isWorthHandling: function() {
					return 'editor' === elementor.getPanelView().getCurrentPageName();
				},
				handle: function() {
					elementor.getPanelView().getCurrentPageView().getOption( 'editedElementView' ).confirmRemove();
				}
			}*/
		};
	};

	var applyHotKey = function( event ) {
		var handlers = hotKeysHandlers[ event.which ];

		if ( ! handlers ) {
			return;
		}

		_.each( handlers, function( handler ) {
			if ( handler.isWorthHandling && ! handler.isWorthHandling( event ) ) {
				return;
			}

			event.preventDefault();

			handler.handle( event );
		} );
	};

	var bindEvents = function() {
		elementor.$window.add( elementorFrontend.getScopeWindow() ).on( 'keydown', applyHotKey );
	};

	this.init = function() {
		initHotKeysHandlers();

		bindEvents();
	};
};

module.exports = new HotKeys( jQuery );
