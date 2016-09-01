(function (factory) {
    factory(jQuery);
}(function ($) {

  'use strict';

  $.FroalaEditor.DefineIcon('customImage', { NAME: 'image'});

  // Define a button.
  $.FroalaEditor.RegisterCommand('customImage', {
    title: '插入圖片',
    // Save the button action into undo stack.
    undo: false,
    // Focus inside the editor before the callback.
    focus: true,
    // Refresh the buttons state after the callback.
    refreshAfterCallback: false,
    // Called when the button is hit.
    callback: function () {
    }
  })

}));
