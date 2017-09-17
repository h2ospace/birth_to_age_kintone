(function(PLUGIN_ID) {
    'use strict';
    
    // 設定値読み込み用変数
    var CONFIG = kintone.plugin.app.getConfig(PLUGIN_ID);
    // 設定値読み込み
    if (!CONFIG) {
        return false;
    }
    
    //レコードの編集、詳細画面で適用する
    var events = [
        'app.record.detail.show'
    ]
    kintone.events.on(events, function(event) {
        var record = event.record;
    
        var el = kintone.app.record.getSpaceElement(CONFIG['age']);
    
        var birth = record[CONFIG['birth']].value.replace(/-/g, '');
    
        const paddingZero = (num, digit) => ('0000' + num).slice(-1 * digit);
    
        const today = new Date();
        const y1 = paddingZero(today.getFullYear(), 4);
        const m1 = paddingZero(today.getMonth() + 1, 2);
        const d1 = paddingZero(today.getDate(), 2);
    
        const age = Math.floor((Number(y1 + m1 + d1) - Number(birth)) / 10000);
    
        el.innerHTML = '<p style="margin-top: 35px">' + age + '歳</p>';
    
        return event;
    });
})(kintone.$PLUGIN_ID);
