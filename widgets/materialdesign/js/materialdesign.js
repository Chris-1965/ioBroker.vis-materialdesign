/*
    ioBroker.vis vis-materialdesign Widget-Set
    
    Copyright 2019 Scrounger scrounger@gmx.net
*/
"use strict";

let iobSystemDic = systemDictionary;
$.get("../vis-materialdesign.admin/words.js", function (script) {
    let translation = script.substring(script.indexOf('{'), script.length);
    translation = translation.substring(0, translation.lastIndexOf(';'));
    $.extend(systemDictionary, JSON.parse(translation));
    $.extend(systemDictionary, iobSystemDic);
});

// Workaround suppress vue warning
const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
Vue.config.warnHandler = function (msg, vm, trace) {
    // `trace` is the component hierarchy trace
    if (msg === ignoreWarnMessage) {
        msg = null;
        vm = null;
        trace = null;
    }
}

// TODO: move widgets to own file -> using minify

vis.binds.materialdesign = {
    showVersion: function () {
        myMdwHelper.waitForVisConnected(function () {
            myMdwHelper.getVersion(function (version) {
                console.log('Version vis-materialdesign: ' + version);

                myMdwHelper.initializeSentry(version);
            });
        });
    },
    addRippleEffect: function (el, data, isIconButton = false) {
        var $this = $(el).parent();

        let btn = $this.get(0) ? $this.get(0) : $this.context;

        if (!isIconButton) {
            mdc.ripple.MDCRipple.attachTo(btn);
            var colorPress = (data.colorPress === undefined || data.colorPress === null || data.colorPress === '') ? '' : data.colorPress;

            if (data.buttonStyle === 'text' || data.buttonStyle === 'outlined') {
                btn.style.setProperty("--mdc-theme-primary", colorPress);
            } else {
                btn.style.setProperty("--mdc-theme-on-primary", colorPress);
            }
        } else {
            var colorPress = (data.colorPress === undefined || data.colorPress === null || data.colorPress === '') ? '' : data.colorPress;
            btn.style.setProperty("--materialdesign-color-icon-button-hover", colorPress);

            const mdcIconButton = new mdc.iconButton.MDCIconButtonToggle(btn);
        }

        $(el).click(function () {
            vis.binds.materialdesign.helper.vibrate(data.vibrateOnMobilDevices);
        });
    },
};